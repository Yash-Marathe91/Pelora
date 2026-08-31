from sqlalchemy import Column, String, Float, DateTime, JSON
from datetime import datetime
from app.database.base_class import Base


class DataSource(Base):
    __tablename__ = "data_sources"

    provider_name = Column(String(100), nullable=False, index=True)
    dataset_name = Column(String(255), nullable=False)
    data_type = Column(String(100), nullable=False)  # SATELLITE, BUOY, AIS, WEATHER_MODEL
    resolution = Column(String(100), default="1km")
    update_frequency = Column(String(100), default="Real-time / 6 Hours")
    status = Column(String(50), default="ACTIVE")
    last_synced_at = Column(DateTime, default=datetime.utcnow)
    license = Column(String(255), default="Public Domain / Open Data")


class DataLineage(Base):
    __tablename__ = "data_lineage"

    target_entity = Column(String(100), nullable=False)
    target_id = Column(String(100), nullable=False)
    source_provider = Column(String(100), nullable=False)
    source_dataset = Column(String(255), nullable=False)
    processing_version = Column(String(50), default="1.0.0")
    confidence_score = Column(Float, default=0.95)
    lineage_metadata = Column(JSON, nullable=True)
