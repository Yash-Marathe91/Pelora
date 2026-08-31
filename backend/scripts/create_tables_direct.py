import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import psycopg2
from app.core.config import settings

SQL_SCHEMA = """
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Operator' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_superuser BOOLEAN DEFAULT FALSE NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vessels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    mmsi VARCHAR(50) UNIQUE NOT NULL,
    imo VARCHAR(50),
    vessel_type VARCHAR(100) DEFAULT 'Fishing Vessel',
    flag VARCHAR(50) DEFAULT 'IN',
    length_meters DOUBLE PRECISION,
    beam_meters DOUBLE PRECISION,
    current_latitude DOUBLE PRECISION,
    current_longitude DOUBLE PRECISION,
    speed_knots DOUBLE PRECISION DEFAULT 0.0,
    heading_degrees DOUBLE PRECISION DEFAULT 0.0,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    last_position_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'PLANNING',
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    risk_level VARCHAR(50) DEFAULT 'LOW',
    waypoints JSONB,
    evidence_summary JSONB,
    vessel_id UUID NOT NULL REFERENCES vessels(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    origin_name VARCHAR(255) NOT NULL,
    destination_name VARCHAR(255) NOT NULL,
    origin_latitude DOUBLE PRECISION NOT NULL,
    origin_longitude DOUBLE PRECISION NOT NULL,
    destination_latitude DOUBLE PRECISION NOT NULL,
    destination_longitude DOUBLE PRECISION NOT NULL,
    distance_nautical_miles DOUBLE PRECISION NOT NULL,
    estimated_duration_hours DOUBLE PRECISION NOT NULL,
    fuel_estimate_liters DOUBLE PRECISION,
    risk_score DOUBLE PRECISION DEFAULT 0.0,
    route_geometry JSONB,
    optimization_type VARCHAR(50) DEFAULT 'BALANCED',
    mission_id UUID REFERENCES missions(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    radius_km DOUBLE PRECISION DEFAULT 50.0,
    source VARCHAR(255) DEFAULT 'Pelora Risk Engine',
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active VARCHAR(50) DEFAULT 'ACTIVE',
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ocean_observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    sst_celsius DOUBLE PRECISION,
    chlorophyll_mg_m3 DOUBLE PRECISION,
    sea_surface_height_meters DOUBLE PRECISION,
    current_speed_knots DOUBLE PRECISION,
    current_direction_degrees DOUBLE PRECISION,
    salinity_psu DOUBLE PRECISION,
    observation_type VARCHAR(50) DEFAULT 'OBSERVATION',
    data_source VARCHAR(255) NOT NULL,
    observed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    confidence_score DOUBLE PRECISION DEFAULT 0.95,
    quality_grade VARCHAR(20) DEFAULT 'A',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS weather_forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    wind_speed_knots DOUBLE PRECISION NOT NULL,
    wind_direction_degrees DOUBLE PRECISION NOT NULL,
    wave_height_meters DOUBLE PRECISION NOT NULL,
    wave_period_seconds DOUBLE PRECISION,
    rain_rate_mm_hr DOUBLE PRECISION DEFAULT 0.0,
    visibility_km DOUBLE PRECISION DEFAULT 10.0,
    pressure_hpa DOUBLE PRECISION DEFAULT 1013.25,
    air_temp_celsius DOUBLE PRECISION,
    data_source VARCHAR(255) NOT NULL,
    forecast_for TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pfz_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    center_latitude DOUBLE PRECISION NOT NULL,
    center_longitude DOUBLE PRECISION NOT NULL,
    pfz_score DOUBLE PRECISION NOT NULL,
    target_species VARCHAR(255) DEFAULT 'Tuna, Mackerel, Sardine',
    depth_meters DOUBLE PRECISION DEFAULT 45.0,
    sst_gradient DOUBLE PRECISION,
    chlorophyll_bloom_index DOUBLE PRECISION,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    confidence DOUBLE PRECISION DEFAULT 0.88,
    provenance JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agent_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query_id VARCHAR(100) NOT NULL,
    agent_name VARCHAR(100) NOT NULL,
    task_description VARCHAR(500) NOT NULL,
    status VARCHAR(50) DEFAULT 'COMPLETED',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duration_ms DOUBLE PRECISION DEFAULT 0.0,
    tools_invoked JSONB,
    sources_consulted JSONB,
    output_summary VARCHAR(2000),
    verification_status VARCHAR(50) DEFAULT 'VERIFIED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_name VARCHAR(100) NOT NULL,
    dataset_name VARCHAR(255) NOT NULL,
    data_type VARCHAR(100) NOT NULL,
    resolution VARCHAR(100) DEFAULT '1km',
    update_frequency VARCHAR(100) DEFAULT 'Real-time / 6 Hours',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    license VARCHAR(255) DEFAULT 'Public Domain / Open Data',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    performed_by VARCHAR(255) DEFAULT 'System',
    target_resource VARCHAR(255) NOT NULL,
    details JSONB,
    ip_address VARCHAR(50),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
"""


def create_schema():
    print("Connecting to Supabase to create domain schema tables...")
    try:
        conn = psycopg2.connect(settings.DATABASE_URL + "?sslmode=require")
        cur = conn.cursor()
        cur.execute(SQL_SCHEMA)
        conn.commit()

        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public';")
        tables = [t[0] for t in cur.fetchall()]
        print("\n--- CREATED SUPABASE POSTGRESQL TABLES ---")
        for table in sorted(tables):
            print(f"  • {table}")

        cur.close()
        conn.close()
        print("\nSuccessfully created all Pelora domain tables!")
        return True
    except Exception as e:
        print("Schema creation failed:", e)
        return False


if __name__ == "__main__":
    create_schema()
