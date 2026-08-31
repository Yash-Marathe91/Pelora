import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.data_providers.registry import registry
from app.services.data_providers.weather_api import WeatherApiProvider
from app.services.data_providers.stormglass import StormglassProvider

client = TestClient(app)


def test_provider_registry():
    providers = registry.list_providers()
    names = [p["name"] for p in providers]
    assert "WeatherAPI.com" in names
    assert "Stormglass.io" in names
    assert "Copernicus Marine Service" in names
    assert "INCOIS" in names


@pytest.mark.asyncio
async def test_weather_api_provider_fetch_and_normalize():
    provider = WeatherApiProvider()
    raw = await provider.fetch_raw_data(15.2993, 73.9814)
    assert raw is not None
    records = provider.normalize(raw)
    assert len(records) > 0
    record = records[0]
    assert record.provider_name == "WeatherAPI.com"
    assert record.dataset_type == "WEATHER"
    assert provider.validate(record) is True


@pytest.mark.asyncio
async def test_stormglass_provider_fetch_and_normalize():
    provider = StormglassProvider()
    raw = await provider.fetch_raw_data(15.2993, 73.9814)
    assert raw is not None
    records = provider.normalize(raw)
    assert len(records) > 0
    record = records[0]
    assert record.provider_name == "Stormglass.io"
    assert record.dataset_type == "OCEAN"
    assert provider.validate(record) is True


def test_list_providers_endpoint():
    response = client.get("/api/v1/datasets/providers")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 4
    assert len(data["providers"]) == 4


def test_trigger_ingestion_endpoint():
    response = client.post(
        "/api/v1/datasets/ingest",
        json={"latitude": 15.2993, "longitude": 73.9814}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["details"]["stats"]["fetched"] == 4
    assert data["details"]["stats"]["cached"] > 0
    assert data["details"]["stats"]["persisted"] > 0
