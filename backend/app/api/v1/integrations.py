from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Query, HTTPException, status
from pydantic import BaseModel, Field

from app.services.integrations.ais_tracker import AISTrackerEngine
from app.services.integrations.copernicus import CopernicusRasterEngine
from app.services.integrations.noaa_gfs import NOAAGFSEngine
from app.services.integrations.lineage import DataLineageTracker

router = APIRouter()

ais_engine = AISTrackerEngine()
copernicus_engine = CopernicusRasterEngine()
noaa_engine = NOAAGFSEngine()
lineage_tracker = DataLineageTracker()


class CopernicusExtractRequest(BaseModel):
    lat_min: float = Field(..., description="Minimum latitude bound", example=16.0)
    lat_max: float = Field(..., description="Maximum latitude bound", example=17.5)
    lon_min: float = Field(..., description="Minimum longitude bound", example=72.5)
    lon_max: float = Field(..., description="Maximum longitude bound", example=73.8)
    variables: Optional[List[str]] = Field(
        default=["sst", "chlorophyll_a", "ssha"],
        description="Variables to extract"
    )


class NOAAGFSRequest(BaseModel):
    latitude: float = Field(..., example=16.985)
    longitude: float = Field(..., example=73.282)
    forecast_hours: int = Field(default=24, ge=6, le=72, example=24)


@router.get(
    "/ais/vessels",
    summary="Get Live AIS Vessel Telemetry",
    description="Retrieve real-time decoded AIS telemetry streams for vessels with spatial bounding box filters."
)
async def get_live_ais_vessels(
    min_lat: Optional[float] = Query(None, description="Minimum latitude"),
    max_lat: Optional[float] = Query(None, description="Maximum latitude"),
    min_lon: Optional[float] = Query(None, description="Minimum longitude"),
    max_lon: Optional[float] = Query(None, description="Maximum longitude"),
) -> Dict[str, Any]:
    vessels = await ais_engine.get_live_fleet_positions(
        min_lat=min_lat, max_lat=max_lat, min_lon=min_lon, max_lon=max_lon
    )
    
    lineage_tracker.record_event(
        provider="DG-Shipping AIS Stream",
        dataset="Live Vessel Telemetry",
        status="SUCCESS",
        records_count=len(vessels),
        transformations=["aivdm_decode", "spatial_bounding_box_filter"],
        cache_hit=False,
        quality_score=1.0
    )

    return {
        "status": "success",
        "count": len(vessels),
        "vessels": vessels
    }


@router.post(
    "/copernicus/raster",
    summary="Extract Copernicus High-Resolution Satellite Raster Grid",
    description="Process multi-variable NetCDF/GeoTIFF raster layers for sea surface temperature, chlorophyll, and sea surface height."
)
async def extract_copernicus_raster(request: CopernicusExtractRequest) -> Dict[str, Any]:
    if request.lat_min >= request.lat_max or request.lon_min >= request.lon_max:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid bounding box. Min bounds must be strictly less than Max bounds."
        )

    grid = await copernicus_engine.extract_grid_profile(
        lat_min=request.lat_min,
        lat_max=request.lat_max,
        lon_min=request.lon_min,
        lon_max=request.lon_max,
        variables=request.variables
    )

    lineage_tracker.record_event(
        provider="Copernicus Marine CMEMS",
        dataset="NetCDF Satellite Grid Profile",
        status="SUCCESS",
        records_count=grid["point_count"],
        transformations=["spatial_bounding_box_crop", "grid_point_interpolation"],
        cache_hit=False,
        quality_score=0.99
    )

    return {
        "status": "success",
        "raster_data": grid
    }


@router.post(
    "/noaa/gfs",
    summary="Fetch NOAA GFS Weather Forecast Grid",
    description="Retrieve 0.25-degree oceanic wind vectors, surface pressure, and precipitation forecasts."
)
async def fetch_noaa_gfs_forecast(request: NOAAGFSRequest) -> Dict[str, Any]:
    forecast = await noaa_engine.fetch_weather_grid_forecast(
        latitude=request.latitude,
        longitude=request.longitude,
        forecast_hours=request.forecast_hours
    )

    lineage_tracker.record_event(
        provider="NOAA GFS 0.25",
        dataset="Oceanic Weather Grid Forecast",
        status="SUCCESS",
        records_count=len(forecast["timeline"]),
        transformations=["grib2_decode", "u_v_vector_conversion"],
        cache_hit=True,
        quality_score=0.97
    )

    return {
        "status": "success",
        "forecast": forecast
    }


@router.get(
    "/lineage/logs",
    summary="Get Data Lineage & Provenance Audit Logs",
    description="Retrieve full audit logs showing dataset sources, processing transformations, and freshness quality scores."
)
async def get_data_lineage_logs(
    limit: int = Query(20, ge=1, le=100, description="Max log entries to return")
) -> Dict[str, Any]:
    logs = lineage_tracker.get_lineage_logs(limit=limit)
    return {
        "status": "success",
        "count": len(logs),
        "logs": logs
    }
