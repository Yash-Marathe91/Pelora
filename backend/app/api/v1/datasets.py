from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.data_providers.registry import registry
from app.services.ingestion.pipeline import pipeline

router = APIRouter(prefix="/datasets", tags=["Data Feeds & Datasets"])


class IngestionRequest(BaseModel):
    latitude: float = Field(..., json_schema_extra={"example": 15.2993}, description="Target location latitude")
    longitude: float = Field(..., json_schema_extra={"example": 73.9814}, description="Target location longitude")


@router.get(
    "/providers",
    summary="List Registered Data Providers",
    description="Returns all active and registered marine & weather data providers along with health status."
)
async def list_providers():
    providers = registry.list_providers()
    health_checks = []
    for p_name in [p["name"] for p in providers]:
        provider_obj = registry.get_provider(p_name)
        status_info = await provider_obj.get_health_status()
        health_checks.append(status_info)
    return {"total": len(health_checks), "providers": health_checks}


@router.post(
    "/ingest",
    summary="Trigger Real-Time Marine Ingestion",
    description="Triggers concurrent raw data ingestion, normalization, Upstash Redis caching, and Supabase persistence."
)
async def trigger_ingestion(
    payload: IngestionRequest,
    db: Session = Depends(get_db)
):
    try:
        result = await pipeline.run_ingestion_for_location(payload.latitude, payload.longitude, db)
        return {
            "status": "success",
            "message": f"Successfully ingested marine data for coordinates ({payload.latitude}, {payload.longitude})",
            "details": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Data ingestion failed: {str(e)}"
        )
