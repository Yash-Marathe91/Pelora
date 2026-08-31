from fastapi import APIRouter, status
from datetime import datetime
from app.core.config import settings
from app.schemas.health import SystemHealthResponse, ReadinessCheckResponse

router = APIRouter()


@router.get(
    "/health",
    response_model=SystemHealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Get System Health",
    description="Returns the basic operational health status of the Pelora FastAPI gateway."
)
async def get_health():
    return SystemHealthResponse(
        status="healthy",
        app_name=settings.APP_NAME,
        project_id=settings.PROJECT_ID,
        version="1.0.0",
        timestamp=datetime.utcnow(),
        environment=settings.ENVIRONMENT
    )


@router.get(
    "/readiness",
    response_model=ReadinessCheckResponse,
    status_code=status.HTTP_200_OK,
    summary="Get System Readiness",
    description="Checks state and connectivity of underlying databases, caches, and AI model engines."
)
async def get_readiness():
    import time
    from app.database.session import engine

    db_status = "unhealthy"
    latency_ms = 0.0

    try:
        start_time = time.time()
        with engine.connect() as conn:
            from sqlalchemy import text
            conn.execute(text("SELECT 1"))
        latency_ms = round((time.time() - start_time) * 1000, 2)
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected: {str(e)}"

    # Live Redis Ping
    redis_status = "unhealthy"
    redis_latency_ms = 0.0
    try:
        import redis
        r_start = time.time()
        r_client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True, socket_timeout=3)
        r_client.ping()
        redis_latency_ms = round((time.time() - r_start) * 1000, 2)
        redis_status = "connected"
    except Exception as re:
        redis_status = f"disconnected: {str(re)}"

    return ReadinessCheckResponse(
        status="ready" if (db_status == "connected" and redis_status == "connected") else "degraded",
        database={
            "status": db_status,
            "provider": "Supabase PostgreSQL (PostGIS + pgvector)",
            "host": settings.POSTGRES_HOST,
            "latency_ms": latency_ms
        },
        redis={
            "status": redis_status,
            "provider": "Upstash Cloud Serverless Redis",
            "host": settings.REDIS_URL.split("@")[-1].split(":")[0],
            "latency_ms": redis_latency_ms
        },
        llm_gateway={
            "provider": settings.LLM_PROVIDER,
            "model": settings.LLM_MODEL,
            "configured": bool(settings.OPENAI_API_KEY or settings.ANTHROPIC_API_KEY or settings.GOOGLE_AI_API_KEY)
        },
        data_feeds={
            "active_sources": 5,
            "simulated_mode": True,
            "weather_api_configured": bool(settings.WEATHER_API_KEY),
            "stormglass_api_configured": bool(settings.STORMGLASS_API_KEY)
        },
        timestamp=datetime.utcnow()
    )
