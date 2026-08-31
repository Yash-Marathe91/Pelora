import json
import asyncio
from typing import List, Dict, Any
from datetime import datetime
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.logging import logger
from app.services.data_providers.registry import registry
from app.services.data_providers.base import NormalizedDataRecord
from app.models.observation import OceanObservation, WeatherForecast
from app.models.pfz import PFZZone


class IngestionPipeline:
    """
    Ingestion Pipeline Orchestrator.
    Handles concurrent fetching, normalization, Upstash Redis caching, and Supabase DB persistence.
    """

    def __init__(self):
        self.providers = [
            registry.get_provider("WeatherAPI.com"),
            registry.get_provider("Stormglass.io"),
            registry.get_provider("Copernicus Marine Service"),
            registry.get_provider("INCOIS"),
        ]

    async def run_ingestion_for_location(self, latitude: float, longitude: float, db: Session) -> Dict[str, Any]:
        logger.info(f"Starting ingestion pipeline for coordinates ({latitude}, {longitude})...")
        start_time = datetime.utcnow()

        # Step 1: Fetch raw payloads concurrently
        fetch_tasks = [
            provider.fetch_raw_data(latitude, longitude)
            for provider in self.providers
        ]
        raw_results = await asyncio.gather(*fetch_tasks, return_exceptions=True)

        all_records: List[NormalizedDataRecord] = []
        ingestion_stats = {"fetched": 0, "normalized": 0, "persisted": 0, "cached": 0}

        # Step 2: Normalize and validate each record
        for provider, result in zip(self.providers, raw_results):
            if isinstance(result, Exception):
                logger.error(f"Ingestion error for provider {provider.provider_name}: {result}")
                continue

            ingestion_stats["fetched"] += 1
            records = provider.normalize(result)

            for rec in records:
                if provider.validate(rec):
                    all_records.append(rec)
                    ingestion_stats["normalized"] += 1

        # Step 3: Cache in Upstash Redis
        self._cache_in_redis(latitude, longitude, all_records)
        ingestion_stats["cached"] = len(all_records)

        # Step 4: Persist into Supabase PostgreSQL Database
        persisted_count = self._persist_to_supabase(all_records, db)
        ingestion_stats["persisted"] = persisted_count

        elapsed = (datetime.utcnow() - start_time).total_seconds()
        logger.info(f"Ingestion pipeline completed in {elapsed:.2f}s. Stats: {ingestion_stats}")

        return {
            "latitude": latitude,
            "longitude": longitude,
            "execution_time_seconds": round(elapsed, 2),
            "stats": ingestion_stats,
            "records": [r.model_dump() for r in all_records]
        }

    def _cache_in_redis(self, lat: float, lon: float, records: List[NormalizedDataRecord]):
        try:
            import redis
            r_client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True, socket_timeout=3)
            cache_key = f"pelora:ingestion:{round(lat, 2)}:{round(lon, 2)}"
            data_json = json.dumps([r.model_dump() for r in records], default=str)
            r_client.set(cache_key, data_json, ex=300)  # 5 minutes TTL
            logger.info(f"Cached {len(records)} records in Upstash Redis under key '{cache_key}'")
        except Exception as e:
            logger.warning(f"Upstash Redis cache write failed: {e}")

    def _persist_to_supabase(self, records: List[NormalizedDataRecord], db: Session) -> int:
        count = 0
        try:
            for r in records:
                if r.dataset_type == "WEATHER":
                    obs = WeatherForecast(
                        latitude=r.latitude,
                        longitude=r.longitude,
                        wind_speed_knots=r.payload.get("wind_speed_knots", 12.0),
                        wind_direction_degrees=r.payload.get("wind_direction_degrees", 220.0),
                        wave_height_meters=r.payload.get("wave_height_meters", 1.2),
                        air_temp_celsius=r.payload.get("air_temp_celsius", 28.0),
                        data_source=r.provider_name,
                        issued_at=r.timestamp
                    )
                    db.add(obs)
                    count += 1
                elif r.dataset_type in ["OCEAN", "SATELLITE"]:
                    obs = OceanObservation(
                        latitude=r.latitude,
                        longitude=r.longitude,
                        sst_celsius=r.payload.get("sst_celsius") or r.payload.get("water_temp_celsius", 28.0),
                        chlorophyll_mg_m3=r.payload.get("chlorophyll_mg_m3", 1.2),
                        sea_surface_height_meters=r.payload.get("sea_surface_height_meters", 0.4),
                        current_speed_knots=r.payload.get("current_speed_knots", 1.5),
                        current_direction_degrees=r.payload.get("current_direction_degrees", 180.0),
                        salinity_psu=r.payload.get("salinity_psu", 35.0),
                        data_source=r.provider_name,
                        confidence_score=r.confidence_score
                    )
                    db.add(obs)
                    count += 1
                elif r.dataset_type == "PFZ":
                    pfz = PFZZone(
                        zone_code=f"PFZ-{r.latitude:.2f}-{r.longitude:.2f}-{datetime.utcnow().strftime('%H%M')}",
                        name=f"Pelora High-Yield PFZ Zone ({r.latitude}, {r.longitude})",
                        center_latitude=r.latitude,
                        center_longitude=r.longitude,
                        pfz_score=r.payload.get("pfz_score", 85.0),
                        target_species=r.payload.get("target_species", "Tuna, Mackerel"),
                        valid_from=r.timestamp,
                        valid_until=datetime.utcnow()
                    )
                    db.add(pfz)
                    count += 1

            db.commit()
            return count
        except Exception as e:
            db.rollback()
            logger.error(f"Failed to persist ingestion records to Supabase: {e}")
            return 0


pipeline = IngestionPipeline()
