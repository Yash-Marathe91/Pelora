import httpx
from typing import Dict, Any, List, Optional
from datetime import datetime
from app.core.config import settings
from app.core.logging import logger
from app.services.data_providers.base import BaseDataProvider, NormalizedDataRecord


class StormglassProvider(BaseDataProvider):
    """
    Stormglass.io Marine Weather & Ocean Current Data Provider.
    """

    def __init__(self, api_key: Optional[str] = None):
        super().__init__("Stormglass.io", api_key or settings.STORMGLASS_API_KEY)
        self.base_url = "https://api.stormglass.io/v2"

    async def fetch_raw_data(self, latitude: float, longitude: float, **kwargs) -> Dict[str, Any]:
        if not self.api_key:
            logger.info("Stormglass key not set. Using simulated ocean current & wave payload.")
            return self._generate_simulated_payload(latitude, longitude)

        try:
            params = {
                "lat": latitude,
                "lng": longitude,
                "params": "waveHeight,wavePeriod,currentSpeed,currentDirection,waterTemperature"
            }
            headers = {"Authorization": self.api_key}

            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.base_url}/weather/point",
                    params=params,
                    headers=headers
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.warning(f"Stormglass responded with status {response.status_code}. Falling back to simulation.")
                    return self._generate_simulated_payload(latitude, longitude)
        except Exception as e:
            logger.error(f"Stormglass fetch error: {e}. Falling back to simulation.")
            return self._generate_simulated_payload(latitude, longitude)

    def normalize(self, raw_data: Dict[str, Any]) -> List[NormalizedDataRecord]:
        try:
            meta = raw_data.get("meta", {})
            lat = meta.get("lat", 15.0)
            lng = meta.get("lng", 73.0)

            hours = raw_data.get("hours", [{}])[0]
            record = NormalizedDataRecord(
                provider_name=self.provider_name,
                dataset_type="OCEAN",
                latitude=float(lat),
                longitude=float(lng),
                timestamp=datetime.utcnow(),
                payload={
                    "wave_height_meters": float(hours.get("waveHeight", {}).get("noaa", 1.3)),
                    "wave_period_seconds": float(hours.get("wavePeriod", {}).get("noaa", 7.5)),
                    "current_speed_knots": float(hours.get("currentSpeed", {}).get("sg", 1.8)),
                    "current_direction_degrees": float(hours.get("currentDirection", {}).get("sg", 185.0)),
                    "water_temp_celsius": float(hours.get("waterTemperature", {}).get("sg", 27.6)),
                },
                confidence_score=0.98
            )
            return [record]
        except Exception as e:
            logger.error(f"Error normalizing Stormglass payload: {e}")
            return []

    def validate(self, record: NormalizedDataRecord) -> bool:
        if not (-90.0 <= record.latitude <= 90.0 and -180.0 <= record.longitude <= 180.0):
            return False
        return True

    def _generate_simulated_payload(self, latitude: float, longitude: float) -> Dict[str, Any]:
        return {
            "meta": {"lat": latitude, "lng": longitude},
            "hours": [
                {
                    "waveHeight": {"noaa": 1.35},
                    "wavePeriod": {"noaa": 8.0},
                    "currentSpeed": {"sg": 1.65},
                    "currentDirection": {"sg": 190.0},
                    "waterTemperature": {"sg": 27.9}
                }
            ]
        }
