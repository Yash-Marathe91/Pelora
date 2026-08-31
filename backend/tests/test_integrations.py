import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_get_live_ais_vessels():
    response = client.get("/api/v1/integrations/ais/vessels")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "count" in data
    assert "vessels" in data
    assert len(data["vessels"]) > 0


def test_extract_copernicus_raster():
    payload = {
        "lat_min": 16.0,
        "lat_max": 17.5,
        "lon_min": 72.5,
        "lon_max": 73.8,
        "variables": ["sst", "chlorophyll_a"]
    }
    response = client.post("/api/v1/integrations/copernicus/raster", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "raster_data" in data
    assert data["raster_data"]["point_count"] > 0


def test_fetch_noaa_gfs_forecast():
    payload = {
        "latitude": 16.985,
        "longitude": 73.282,
        "forecast_hours": 24
    }
    response = client.post("/api/v1/integrations/noaa/gfs", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "forecast" in data
    assert len(data["forecast"]["timeline"]) > 0


def test_get_data_lineage_logs():
    response = client.get("/api/v1/integrations/lineage/logs")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "logs" in data
    assert len(data["logs"]) > 0
