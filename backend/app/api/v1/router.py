from fastapi import APIRouter
from app.api.v1 import health, datasets, integrations

api_router = APIRouter()

# Core System & Data Feeds Routers
api_router.include_router(health.router, tags=["System & Health"])
api_router.include_router(datasets.router, tags=["Data Feeds & Datasets"])
api_router.include_router(integrations.router, prefix="/integrations", tags=["External Integrations & Lineage"])

