from sqlalchemy import Column, String, Float, DateTime, JSON
from datetime import datetime
from app.database.base_class import Base


class PFZZone(Base):
    __tablename__ = "pfz_zones"

    zone_code = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    center_latitude = Column(Float, nullable=False)
    center_longitude = Column(Float, nullable=False)
    pfz_score = Column(Float, nullable=False)  # 0 to 100
    target_species = Column(String(255), default="Tuna, Mackerel, Sardine")
    depth_meters = Column(Float, default=45.0)
    sst_gradient = Column(Float, nullable=True)
    chlorophyll_bloom_index = Column(Float, nullable=True)
    valid_from = Column(DateTime, default=datetime.utcnow, nullable=False)
    valid_until = Column(DateTime, nullable=False)
    confidence = Column(Float, default=0.88)
    provenance = Column(JSON, nullable=True)
