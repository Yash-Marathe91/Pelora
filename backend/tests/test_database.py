from fastapi.testclient import TestClient
from app.main import app
from app.database.session import SessionLocal
from app.models.user import User, Organization

client = TestClient(app)


def test_database_session_connection():
    db = SessionLocal()
    try:
        from sqlalchemy import text
        result = db.execute(text("SELECT 1")).scalar()
        assert result == 1
    finally:
        db.close()


def test_live_readiness_with_supabase_and_redis():
    response = client.get("/api/v1/readiness")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["ready", "healthy"]
    assert data["database"]["status"] == "connected"
    assert "latency_ms" in data["database"]
    assert data["redis"]["status"] == "connected"
    assert "latency_ms" in data["redis"]
    assert data["data_feeds"]["weather_api_configured"] is True
    assert data["data_feeds"]["stormglass_api_configured"] is True
