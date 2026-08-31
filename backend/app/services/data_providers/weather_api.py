import httpx
from typing import Dict, Any, List, Optional
from datetime import datetime
from app.core.config import settings
from app.core.logging import logger
from app.services.data_providers.base import BaseDataProvider, NormalizedDataRecord


class WeatherApiProvider(BaseDataProvider):
    """
    WeatherAPI.com Marine Data Provider.
    """

    def __init__(self, api_key: Optional[str] = None):
        super().__init__("WeatherAPI.com", api_key or settings.WEATHER_API_KEY)
        self.base_url = "http://api.weatherapi.com/v1"

    async def fetch_raw_data(self, latitude: float, longitude: float, **kwargs) -> Dict[str, Any]:
        if not self.api_key:
            logger.info("WeatherAPI key not set. Using simulated marine weather payload.")
            return self._generate_simulated_payload(latitude, longitude)

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.base_url}/marine.json",
                    params={"key": self.api_key, "q": f"{latitude},{longitude}", "days": 1}
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.warning(f"WeatherAPI responded with status {response.status_code}. Falling back to simulation.")
                    return self._generate_simulated_payload(latitude, longitude)
        except Exception as e:
            logger.error(f"WeatherAPI fetch error: {e}. Falling back to simulation.")
            return self._generate_simulated_payload(latitude, longitude)

    def normalize(self, raw_data: Dict[str, Any]) -> List[NormalizedDataRecord]:
        try:
            forecast_data = raw_data.get("forecast", {}).get("forecastday", [])[0].get("hour", [])[0]
            lat = raw_data.get("location", {}).get("lat", 15.0)
            lon = raw_data.get("location", {}).get("lon", 73.0)

            record = NormalizedDataRecord(
                provider_name=self.provider_name,
                dataset_type="WEATHER",
                latitude=float(lat),
                longitude=float(lon),
                timestamp=datetime.utcnow(),
                payload={
                    "wind_speed_knots": round(float(forecast_data.get("wind_kph", 12.0)) * 0.539957, 2),
                    "wind_direction_degrees": float(forecast_data.get("wind_degree", 220)),
                    "wave_height_meters": float(forecast_data.get("sig_ht_mt", 1.2)),
                    "pressure_hpa": float(forecast_data.get("pressure_mb", 1012.0)),
                    "visibility_km": float(forecast_data.get("vis_km", 10.0)),
                    "air_temp_celsius": float(forecast_data.get("temp_c", 28.5)),
                    "water_temp_celsius": float(forecast_data.get("water_temp_c", 27.8)),
                },
                confidence_score=0.96
            )
            return [record]
        except Exception as e:
            logger.error(f"Error normalizing WeatherAPI payload: {e}")
            return []

    def validate(self, record: NormalizedDataRecord) -> bool:
        if not (-90.0 <= record.latitude <= 90.0 and -180.0 <= record.longitude <= 180.0):
            return False
        payload = record.payload
        if payload.get("wind_speed_knots", 0) < 0 or payload.get("wave_height_meters", 0) < 0:
            return False
        return True

    def _generate_simulated_payload(self, latitude: float, longitude: float) -> Dict[str, Any]:
        return {
            "location": {"lat": latitude, "lon": longitude},
            "forecast": {
                "forecastday": [
                    {
                        "hour": [
                            {
                                "wind_kph": 24.5,
                                "wind_degree": 230,
                                "sig_ht_mt": 1.4,
                                "pressure_mb": 1011.5,
                                "vis_km": 12.0,
                                "temp_c": 29.2,
                                "water_temp_c": 28.1,
                            }
                        ]
                    }
                ]
            }
        }
