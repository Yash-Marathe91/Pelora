from sqlalchemy import Column, String, Float, DateTime, JSON
from datetime import datetime
from app.database.base_class import Base


class OceanObservation(Base):
    __tablename__ = "ocean_observations"

    latitude = Column(Float, nullable=False, index=True)
    longitude = Column(Float, nullable=False, index=True)
    sst_celsius = Column(Float, nullable=True)
    chlorophyll_mg_m3 = Column(Float, nullable=True)
    sea_surface_height_meters = Column(Float, nullable=True)
    current_speed_knots = Column(Float, nullable=True)
    current_direction_degrees = Column(Float, nullable=True)
    salinity_psu = Column(Float, nullable=True)

    observation_type = Column(String(50), default="OBSERVATION")  # OBSERVATION, FORECAST, MODELLED, DERIVED
    data_source = Column(String(255), nullable=False)
    observed_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    confidence_score = Column(Float, default=0.95)
    quality_grade = Column(String(20), default="A")


class WeatherForecast(Base):
    __tablename__ = "weather_forecasts"

    latitude = Column(Float, nullable=False, index=True)
    longitude = Column(Float, nullable=False, index=True)
    wind_speed_knots = Column(Float, nullable=False)
    wind_direction_degrees = Column(Float, nullable=False)
    wave_height_meters = Column(Float, nullable=False)
    wave_period_seconds = Column(Float, nullable=True)
    rain_rate_mm_hr = Column(Float, default=0.0)
    visibility_km = Column(Float, default=10.0)
    pressure_hpa = Column(Float, default=1013.25)
    air_temp_celsius = Column(Float, nullable=True)

    data_source = Column(String(255), nullable=False)
    forecast_for = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    issued_at = Column(DateTime, default=datetime.utcnow, nullable=False)
