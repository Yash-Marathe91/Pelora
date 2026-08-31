# Pelora Platform — Manual Setup & Credential Tracker

This document tracks all manual setup actions required for external data services, database extensions, and deployment steps.

---

## Active & Required Setup Checklist

- [ ] **Task**: Install Python 3.11+ dependencies
  - **Action**: Run `pip install -r backend/requirements.txt`
  - **Status**: Pending local execution

- [x] **Task**: Configure Supabase PostgreSQL Project
  - **Action**: Connected live project `https://dltrulwzzhfhcwnusaxk.supabase.co`. Credentials configured in `backend/.env` and `frontend/.env.local`.
  - **Platform**: Supabase Cloud
  - **Environment Variable**: `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`
  - **Status**: Completed

- [x] **Task**: Configure Redis Server
  - **Action**: Connected live Upstash Redis `rediss://genuine-seahorse-87160.upstash.io:6379`. Credentials configured in `backend/.env`.
  - **Platform**: Upstash Cloud Redis
  - **Environment Variable**: `REDIS_URL`, `UPSTASH_REDIS_REST_URL`
  - **Status**: Completed

- [ ] **Task**: Obtain LLM Provider API Key
  - **Action**: Generate API Key in OpenAI / Anthropic / Google AI Portal
  - **Environment Variable**: `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY` / `GOOGLE_AI_API_KEY`)
  - **Status**: Required for Phase 9 (LangGraph Orchestration)

- [ ] **Task**: Copernicus Marine Service Account Registration
  - **Action**: Register account at [Copernicus Marine Service](https://marine.copernicus.eu/)
  - **Environment Variable**: `COPERNICUS_USERNAME`, `COPERNICUS_PASSWORD`
  - **Status**: Optional (Fallback mock provider enabled in Phase 3)

- [ ] **Task**: NASA Earthdata Account Setup
  - **Action**: Register account at [NASA Earthdata](https://urs.earthdata.nasa.gov/)
  - **Environment Variable**: `NASA_EARTHDATA_USERNAME`, `NASA_EARTHDATA_PASSWORD`
  - **Status**: Optional (Fallback mock provider enabled in Phase 3)
