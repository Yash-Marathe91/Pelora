-- ========================================================
-- PELORA MARINE INTELLIGENCE PLATFORM — PHASE 1 INITIALIZATION
-- Run on Supabase PostgreSQL Database (SQL Editor or Script)
-- ========================================================

-- 1. Enable PostGIS Extension (Geospatial Geometry, Geography & Spatial Indexes)
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. Enable pgvector Extension (Vector Embeddings for RAG & AI Retrieval)
CREATE EXTENSION IF NOT EXISTS "vector";

-- 3. Enable UUID Extension (Universally Unique Identifiers)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 4. Verify Installed Extensions
SELECT extname, extversion FROM pg_extension;
