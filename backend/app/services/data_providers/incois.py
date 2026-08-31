from typing import Dict, Any, List, Optional
from datetime import datetime
from app.services.data_providers.base import BaseDataProvider, NormalizedDataRecord


class INCOISProvider(BaseDataProvider):
    """
    INCOIS (Indian National Centre for Ocean Information Services) PFZ & Ocean Advisory Provider.
    """

    def __init__(self, api_key: Optional[str] = None):
        super().__init__("INCOIS", api_key)

    async def fetch_raw_data(self, latitude: float, longitude: float, **kwargs) -> Dict[str, Any]:
        return {
            "center_lat": latitude,
            "center_lon": longitude,
            "pfz_score": 88.5,
            "potential_species": ["Yellowfin Tuna", "Indian Mackerel", "Sardine"],
            "depth_meters": 42.0,
            "valid_until": "2026-09-02T23:59:59Z"
        }

    def normalize(self, raw_data: Dict[str, Any]) -> List[NormalizedDataRecord]:
        record = NormalizedDataRecord(
            provider_name=self.provider_name,
            dataset_type="PFZ",
            latitude=raw_data["center_lat"],
            longitude=raw_data["center_lon"],
            timestamp=datetime.utcnow(),
            payload={
                "pfz_score": raw_data["pfz_score"],
                "target_species": ", ".join(raw_data["potential_species"]),
                "depth_meters": raw_data["depth_meters"],
                "valid_until": raw_data["valid_until"]
            },
            confidence_score=0.94
        )
        return [record]

    def validate(self, record: NormalizedDataRecord) -> bool:
        return -90.0 <= record.latitude <= 90.0 and -180.0 <= record.longitude <= 180.0
