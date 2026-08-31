from typing import Dict, Any, List, Optional
from datetime import datetime
import uuid


class DataLineageTracker:
    """
    Data Lineage & Provenance Tracker.
    Records data origin, transformation history, schema version, quality scores, and cache hits.
    """

    def __init__(self):
        self._audit_log: List[Dict[str, Any]] = [
            {
                "lineage_id": str(uuid.uuid4()),
                "source_provider": "WeatherAPI",
                "dataset_name": "Marine Forecast Grid",
                "ingestion_status": "SUCCESS",
                "records_processed": 24,
                "transformation_steps": ["raw_json_parse", "unit_conversion_m_s", "redis_cache_write"],
                "cache_hit": False,
                "quality_score": 0.98,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            },
            {
                "lineage_id": str(uuid.uuid4()),
                "source_provider": "Stormglass",
                "dataset_name": "Wave Hydrodynamics",
                "ingestion_status": "SUCCESS",
                "records_processed": 18,
                "transformation_steps": ["point_query", "swell_component_merge", "db_upsert"],
                "cache_hit": True,
                "quality_score": 0.95,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            },
            {
                "lineage_id": str(uuid.uuid4()),
                "source_provider": "Copernicus Marine",
                "dataset_name": "SST Satellite Raster",
                "ingestion_status": "SUCCESS",
                "records_processed": 16,
                "transformation_steps": ["netcdf_slice", "bounding_box_clip", "gradient_calc"],
                "cache_hit": False,
                "quality_score": 0.99,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        ]

    def record_event(
        self,
        provider: str,
        dataset: str,
        status: str,
        records_count: int,
        transformations: List[str],
        cache_hit: bool = False,
        quality_score: float = 1.0
    ) -> Dict[str, Any]:
        """
        Log a new data lineage provenance record.
        """
        record = {
            "lineage_id": str(uuid.uuid4()),
            "source_provider": provider,
            "dataset_name": dataset,
            "ingestion_status": status,
            "records_processed": records_count,
            "transformation_steps": transformations,
            "cache_hit": cache_hit,
            "quality_score": quality_score,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
        self._audit_log.insert(0, record)
        return record

    def get_lineage_logs(self, limit: int = 50) -> List[Dict[str, Any]]:
        """
        Retrieve recent data lineage audit entries.
        """
        return self._audit_log[:limit]
