from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class NormalizedDataRecord(BaseModel):
    provider_name: str
    dataset_type: str  # WEATHER, OCEAN, SATELLITE, PFZ
    latitude: float
    longitude: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    payload: Dict[str, Any]
    confidence_score: float = 0.95
    quality_grade: str = "A"


class BaseDataProvider(ABC):
    """
    Abstract Base Class for all Pelora Marine & Weather Data Providers.
    """

    def __init__(self, provider_name: str, api_key: Optional[str] = None):
        self.provider_name = provider_name
        self.api_key = api_key

    @abstractmethod
    async def fetch_raw_data(self, latitude: float, longitude: float, **kwargs) -> Dict[str, Any]:
        """Fetch raw payload from external API or satellite feed."""
        pass

    @abstractmethod
    def normalize(self, raw_data: Dict[str, Any]) -> List[NormalizedDataRecord]:
        """Transform provider raw structure into standardized Pelora normalized data records."""
        pass

    @abstractmethod
    def validate(self, record: NormalizedDataRecord) -> bool:
        """Validate physical boundaries (e.g. valid lat/lon, reasonable SST range)."""
        pass

    async def get_health_status(self) -> Dict[str, Any]:
        """Returns operational health of the provider API endpoint."""
        return {
            "provider": self.provider_name,
            "configured": bool(self.api_key),
            "status": "ready" if self.api_key else "simulated_mode"
        }
