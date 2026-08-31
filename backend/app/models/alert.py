from sqlalchemy import Column, String, Float, DateTime, JSON
from datetime import datetime
from app.database.base_class import Base


class Alert(Base):
    __tablename__ = "alerts"

    title = Column(String(255), nullable=False)
    severity = Column(String(50), nullable=False, index=True)  # ADVISORY, WARNING, CRITICAL
    category = Column(String(100), nullable=False)  # SQUALL, WAVE, PFZ, CYCLONE, GEOFENCE
    description = Column(String(1000), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    radius_km = Column(Float, default=50.0)
    source = Column(String(255), default="Pelora Risk Engine")
    issued_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, nullable=True)
    is_active = Column(String(50), default="ACTIVE")
    payload = Column(JSON, nullable=True)
