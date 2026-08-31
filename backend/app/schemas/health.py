from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
from datetime import datetime


class SystemHealthResponse(BaseModel):
    status: str = Field(..., json_schema_extra={"example": "healthy"})
    app_name: str = Field(..., json_schema_extra={"example": "Pelora"})
    project_id: str = Field(..., json_schema_extra={"example": "7911176185393304665"})
    version: str = Field(..., json_schema_extra={"example": "1.0.0"})
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    environment: str = Field(..., json_schema_extra={"example": "development"})


class ReadinessCheckResponse(BaseModel):
    status: str = Field(..., json_schema_extra={"example": "ready"})
    database: Dict[str, Any] = Field(..., json_schema_extra={"example": {"status": "connected", "latency_ms": 1.2}})
    redis: Dict[str, Any] = Field(..., json_schema_extra={"example": {"status": "connected", "latency_ms": 0.5}})
    llm_gateway: Dict[str, Any] = Field(..., json_schema_extra={"example": {"provider": "openai", "configured": True}})
    data_feeds: Dict[str, Any] = Field(..., json_schema_extra={"example": {"active_sources": 5}})
    timestamp: datetime = Field(default_factory=datetime.utcnow)
