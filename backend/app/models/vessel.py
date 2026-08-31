from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.base_class import Base


class Vessel(Base):
    __tablename__ = "vessels"

    name = Column(String(255), nullable=False, index=True)
    mmsi = Column(String(50), unique=True, nullable=False, index=True)
    imo = Column(String(50), nullable=True)
    vessel_type = Column(String(100), default="Fishing Vessel")
    flag = Column(String(50), default="IN")
    length_meters = Column(Float, nullable=True)
    beam_meters = Column(Float, nullable=True)
    current_latitude = Column(Float, nullable=True)
    current_longitude = Column(Float, nullable=True)
    speed_knots = Column(Float, default=0.0)
    heading_degrees = Column(Float, default=0.0)
    status = Column(String(50), default="ACTIVE")
    last_position_update = Column(DateTime, default=datetime.utcnow)

    organization_id = Column(Base.id.type, ForeignKey("organizations.id", ondelete="SET NULL"), nullable=True)
    missions = relationship("Mission", back_populates="vessel")


class Mission(Base):
    __tablename__ = "missions"

    title = Column(String(255), nullable=False)
    code = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(String(1000), nullable=True)
    status = Column(String(50), default="PLANNING")  # PLANNING, ACTIVE, COMPLETED, ABORTED
    start_time = Column(DateTime, nullable=True)
    end_time = Column(DateTime, nullable=True)
    risk_level = Column(String(50), default="LOW")
    waypoints = Column(JSON, nullable=True)
    evidence_summary = Column(JSON, nullable=True)

    vessel_id = Column(Base.id.type, ForeignKey("vessels.id", ondelete="CASCADE"), nullable=False)
    vessel = relationship("Vessel", back_populates="missions")
