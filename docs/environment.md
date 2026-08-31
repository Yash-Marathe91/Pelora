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

---

## Frontend Environment Variables (`frontend/.env.local`)

| Variable | Purpose | Exposed to Browser |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_NAME` | UI brand name display | Yes |
| `NEXT_PUBLIC_PROJECT_ID` | App project reference | Yes |
| `NEXT_PUBLIC_API_BASE_URL` | FastAPI backend URL | Yes |
| `NEXT_PUBLIC_WS_URL` | WebSocket stream endpoint | Yes |
| `NEXT_PUBLIC_MAP_PROVIDER` | Base map renderer identifier | Yes |
