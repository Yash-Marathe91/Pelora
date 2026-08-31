from typing import Dict, List, Type
from app.core.logging import logger
from app.services.data_providers.base import BaseDataProvider
from app.services.data_providers.weather_api import WeatherApiProvider
from app.services.data_providers.stormglass import StormglassProvider
from app.services.data_providers.copernicus import CopernicusProvider
from app.services.data_providers.incois import INCOISProvider


class DataProviderRegistry:
    """
    Registry for dynamic data provider discovery and instantiation.
    """

    def __init__(self):
        self._providers: Dict[str, BaseDataProvider] = {}
        self._register_default_providers()

    def _register_default_providers(self):
        self.register(WeatherApiProvider())
        self.register(StormglassProvider())
        self.register(CopernicusProvider())
        self.register(INCOISProvider())

    def register(self, provider: BaseDataProvider):
        self._providers[provider.provider_name] = provider
        logger.info(f"Registered Data Provider: {provider.provider_name}")

    def get_provider(self, name: str) -> BaseDataProvider:
        if name not in self._providers:
            raise KeyError(f"Provider '{name}' not found in registry.")
        return self._providers[name]

    def list_providers(self) -> List[Dict[str, str]]:
        return [
            {"name": p.provider_name, "status": "active"}
            for p in self._providers.values()
        ]


registry = DataProviderRegistry()
