# Pelora Environment Variable Reference

This document describes all environment variables used across the Pelora platform.

---

## Backend Environment Variables (`backend/.env`)

### Application Core
| Variable | Purpose | Required | Default | Security Level |
| :--- | :--- | :--- | :--- | :--- |
| `APP_NAME` | Identifier for the platform | Yes | `Pelora` | Public |
| `PROJECT_ID` | Platform registration ID | Yes | `7911176185393304665` | Public |
| `ENVIRONMENT` | Runtime environment (`development`, `production`, `test`) | Yes | `development` | Internal |
| `DEBUG` | Enables verbose debug logs and OpenAPI docs | Yes | `true` | Internal |
| `API_V1_STR` | Prefix path for API v1 routes | Yes | `/api/v1` | Public |

### Security & Authentication
| Variable | Purpose | Required | Default | Security Level |
| :--- | :--- | :--- | :--- | :--- |
| `SECRET_KEY` | Application secret key for signing internal tokens | Yes | Must configure | Secret |
| `JWT_SECRET_KEY` | Secret key for issuing and validating user JWT tokens | Yes | Must configure | Secret |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Lifetime of user access tokens | Yes | `1440` (24 hrs) | Internal |

### Database & Storage (Supabase PostgreSQL)
| Variable | Purpose | Required | Default / Example | Security Level |
| :--- | :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Supabase PostgreSQL connection string (with PostGIS + pgvector) | Yes | `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres` | Secret |
| `POSTGRES_HOST` | Supabase DB host | Yes | `db.[REF].supabase.co` | Secret |
| `REDIS_URL` | Redis connection URL for caching & pub/sub | Yes | `redis://localhost:6379/0` | Secret |
| `S3_ENDPOINT` | MinIO, AWS S3, or Supabase Storage S3-compat endpoint | Optional | - | Secret |
| `S3_BUCKET` | S3 bucket name for raster assets | Optional | `pelora-marine-data` | Internal |

### AI & Multi-Agent Engine
| Variable | Purpose | Required | Default | Security Level |
| :--- | :--- | :--- | :--- | :--- |
| `LLM_PROVIDER` | LLM Gateway provider (`openai`, `anthropic`, `google`) | Yes | `openai` | Internal |
| `LLM_MODEL` | Default model for reasoning agents | Yes | `gpt-4o` | Internal |
| `OPENAI_API_KEY` | OpenAI API credential | Optional | - | Secret |
| `ANTHROPIC_API_KEY` | Anthropic Claude API credential | Optional | - | Secret |
| `GOOGLE_AI_API_KEY` | Google Gemini API credential | Optional | - | Secret |

### External Marine Data Providers
| Variable | Purpose | Required | Default | Security Level |
| :--- | :--- | :--- | :--- | :--- |
| `WEATHER_API_KEY` | OpenWeatherMap / StormGlass API credential | Optional | - | Secret |
| `INCOIS_API_KEY` | INCOIS data service access key | Optional | - | Secret |
| `COPERNICUS_USERNAME` | Copernicus Marine Service login user | Optional | - | Secret |
| `COPERNICUS_PASSWORD` | Copernicus Marine Service login password | Optional | - | Secret |
| `NASA_EARTHDATA_USERNAME` | NASA Earthdata login user | Optional | - | Secret |
| `NASA_EARTHDATA_PASSWORD` | NASA Earthdata login password | Optional | - | Secret |

### Emergency Telemetry & Alert Dispatch (Twilio SMS)
| Variable | Purpose | Required | Default | Security Level |
| :--- | :--- | :--- | :--- | :--- |
| `TWILIO_ACCOUNT_SID` | Twilio Account Account SID for SOS alert SMS dispatch | Optional | `AC52dc...` | Secret |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token for API request authorization | Optional | `a5a75...` | Secret |
| `TWILIO_PHONE_NUMBER` | Twilio E.164 Sender Phone Number | Optional | `+16592655827` | Secret |

---

## Frontend Environment Variables (`.env.local`)

| Variable | Purpose | Exposed to Browser | Required / Fallback |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_BACKEND_URL` | FastAPI Backend Endpoint (e.g. `http://localhost:8000`) | Yes | Required for live data ingestion & AIS fetching |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL JS Access Token for high-res dark ocean & satellite bathymetry basemaps | Yes | Optional (Fallback: Open CARTO Dark Tiles) |
| `NEXT_PUBLIC_MAPTILER_KEY` | MapTiler Ocean vector basemap key for bathymetric contours | Yes | Optional (Fallback: Open CARTO Dark Tiles) |
| `NEXT_PUBLIC_APP_NAME` | UI brand name display (`Pelora`) | Yes | Optional (`Pelora`) |
| `NEXT_PUBLIC_PROJECT_ID` | App project reference (`7911176185393304665`) | Yes | Optional |
| `NEXT_PUBLIC_WS_URL` | WebSocket live vessel telemetry stream endpoint | Yes | Optional |

---

## Detailed Map & Marine API Setup Instructions

### 1. Map Tiles & Vector Basemaps
- **CARTO Dark (Active Default)**: No key required! Uses open dark raster basemaps (`https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`).
- **Mapbox Dark / Satellite Bathymetry (Optional Upgrade)**:
  - Register at [Mapbox Account Portal](https://account.mapbox.com/)
  - Obtain a public token (`pk.eyJ...`)
  - Set `NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ...` in `.env.local`
- **MapTiler Ocean (Optional Upgrade)**:
  - Register at [MapTiler Cloud](https://cloud.maptiler.com/)
  - Set `NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_key` in `.env.local`

### 2. Live Data Ingestion & Marine Telemetry (Backend `.env`)
- **WeatherAPI**: Set `WEATHER_API_KEY` (Already configured in `backend/.env`)
- **Stormglass Ocean Hydrodynamics**: Set `STORMGLASS_API_KEY` (Already configured in `backend/.env`)
- **Copernicus Marine CMEMS (NetCDF Satellite Rasters)**:
  - Register free account at [Copernicus Marine](https://marine.copernicus.eu/)
  - Set `COPERNICUS_USERNAME` and `COPERNICUS_PASSWORD` in `backend/.env`
- **AIS Live Stream (Vessel Tracking)**:
  - Set `AIS_STREAM_API_KEY` (Optional for live WebSocket AIS ingestion)

