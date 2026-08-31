from sqlalchemy import Column, String, Float, ForeignKey, JSON
from app.database.base_class import Base


class Route(Base):
    __tablename__ = "routes"

    name = Column(String(255), nullable=False)
    origin_name = Column(String(255), nullable=False)
    destination_name = Column(String(255), nullable=False)
    origin_latitude = Column(Float, nullable=False)
    origin_longitude = Column(Float, nullable=False)
    destination_latitude = Column(Float, nullable=False)
    destination_longitude = Column(Float, nullable=False)
    distance_nautical_miles = Column(Float, nullable=False)
    estimated_duration_hours = Column(Float, nullable=False)
    fuel_estimate_liters = Column(Float, nullable=True)
    risk_score = Column(Float, default=0.0)
    route_geometry = Column(JSON, nullable=True)  # LineString coordinates
    optimization_type = Column(String(50), default="BALANCED")  # BALANCED, FASTEST, SAFEST, EFFICIENT

    mission_id = Column(Base.id.type, ForeignKey("missions.id", ondelete="SET NULL"), nullable=True)
