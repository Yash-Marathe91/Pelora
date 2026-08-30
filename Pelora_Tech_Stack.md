# PELORA --- COMPLETE TECH STACK

## Marine Intelligence • Multi-Agent AI • Geospatial Decision Support

**Version:** 1.0\
**Platform:** Pelora\
**Architecture:** Real-time, geospatial, agentic AI platform

------------------------------------------------------------------------

# 1. TECHNOLOGY STRATEGY

Pelora should be built as a modular platform rather than a monolithic
application.

Core architecture:

Frontend → API Gateway → Application Services → Agent Orchestration →
Data/AI Services → Geospatial Engine → Real-Time/Event Layer →
Databases/Object Storage → External Marine Data Sources

Primary engineering goals: - real-time marine intelligence - reliable
geospatial processing - multi-agent orchestration - explainable AI -
data provenance - low-latency dashboards - resilient external API
ingestion - offline-capable field experience - horizontal scalability -
observability - security

Recommended primary stack:

Frontend: Next.js + React + TypeScript UI: Tailwind CSS + shadcn/ui
Maps: MapLibre GL JS Charts: Apache ECharts Backend API: FastAPI +
Python AI/Agents: LangGraph + Python Async workers: Celery or Temporal
Database: PostgreSQL + PostGIS Time-series: TimescaleDB Cache: Redis
Object storage: S3-compatible storage Search: OpenSearch Streaming:
Apache Kafka / Redpanda Geospatial processing: GDAL + Rasterio +
GeoPandas + xarray ML: PyTorch + scikit-learn + XGBoost Vector search:
pgvector Containers: Docker Deployment: Kubernetes Cloud: AWS / Azure /
GCP Observability: OpenTelemetry + Prometheus + Grafana CI/CD: GitHub
Actions

------------------------------------------------------------------------

# 2. FRONTEND STACK

## 2.1 Framework

### Next.js

Use Next.js with React and TypeScript.

Responsibilities: - application routing - server-side rendering where
useful - authentication flows - dashboard shell - API integration -
streaming AI responses - responsive UI - SEO for public pages - code
splitting

Recommended structure:

app/ (marketing)/ (auth)/ dashboard/ ask/ map/ fishing/ safety/ routes/
analytics/ ecosystem/ research/ reports/ missions/ alerts/ vessels/
collaboration/ data/ agents/ settings/

------------------------------------------------------------------------

# 3. FRONTEND LANGUAGE

## TypeScript

Use TypeScript everywhere in the frontend.

Benefits: - strong typing for marine datasets - safer API integration -
predictable map-layer models - typed AI responses - typed mission/route
objects - easier team collaboration

Define shared domain types:

Vessel Mission Route PFZ MarineAlert OceanObservation Forecast Dataset
AgentExecution Evidence ResearchStudy EcosystemIndicator

------------------------------------------------------------------------

# 4. UI SYSTEM

## Tailwind CSS

Use Tailwind for: - layout - responsive behavior - spacing -
typography - design tokens - dark theme

## shadcn/ui

Use shadcn/ui for: - buttons - dialogs - dropdowns - tabs - command
palette - sheets - tooltips - forms - tables - navigation - alerts

Do not rely on default shadcn styling. Apply Pelora's custom ocean
design system.

------------------------------------------------------------------------

# 5. COMPONENT ARCHITECTURE

Create reusable components:

components/ navigation/ maps/ ai/ safety/ fishing/ routes/ vessels/
missions/ analytics/ ecosystem/ research/ reports/ alerts/ evidence/
agents/ data/ charts/

Examples:

MarineMap LayerManager MapLegend TimeSlider PFZCard RiskGauge
SafetyScore MarineAlert EvidenceCard ConfidenceBadge AgentTimeline
AgentStatus MissionCard VesselMarker RouteComparison DataFreshness
DataLineage AIComposer AIResponse SourceCard

The same components must be reused across all 20 pages.

------------------------------------------------------------------------

# 6. MAP TECHNOLOGY

## Recommended: MapLibre GL JS

Use MapLibre GL JS for the primary interactive map.

Reasons: - open-source - vector tile support - customizable styling -
excellent WebGL rendering - suitable for marine geospatial
visualization - avoids vendor lock-in

Use: - vector tiles - raster tiles - GeoJSON - terrain - custom
overlays - animated layers.

## Alternative

Mapbox GL JS can be considered if commercial services are acceptable.

------------------------------------------------------------------------

# 7. GEOSPATIAL FRONTEND

Use:

MapLibre GL JS + deck.gl + Turf.js

### deck.gl

Use for high-performance visualization: - vessel tracks - heatmaps -
arcs - polygons - trajectories - point clouds - current vectors - large
datasets

### Turf.js

Use for: - distance - buffers - polygons - intersections - bearings -
spatial calculations - route geometry utilities.

------------------------------------------------------------------------

# 8. CHARTING

## Apache ECharts

Recommended for: - SST time series - chlorophyll trends - wave
forecasts - risk trajectories - historical comparisons - anomaly
charts - route comparisons

Use synchronized charts with map interactions.

Example: Selecting a map region updates the chart.

------------------------------------------------------------------------

# 9. STATE MANAGEMENT

Recommended:

Zustand

Use for: - map state - selected layers - current vessel - mission
context - filters - AI context - UI state.

Use TanStack Query for: - server state - API caching - background
refetching - pagination - stale data handling.

------------------------------------------------------------------------

# 10. REAL-TIME FRONTEND

Use: - WebSockets - Server-Sent Events where appropriate - WebRTC only
if real-time voice/video becomes necessary.

Use real-time channels for: - vessel positions - alert updates - mission
changes - agent execution status - data freshness - collaborative
annotations.

------------------------------------------------------------------------

# 11. PWA / MOBILE

Use:

Next.js PWA architecture or a dedicated React Native application
depending on requirements.

For initial prototype: Next.js responsive PWA.

For production field application: React Native + Expo can be introduced.

Important capabilities: - offline mission cache - offline map tiles -
push notifications - GPS - voice - background synchronization.

------------------------------------------------------------------------

# 12. FRONTEND AUTHENTICATION

Recommended:

Auth.js / OAuth2 / OpenID Connect

For enterprise deployments: Keycloak or cloud identity provider.

Support: - email/OTP - Google/organization login - role-based access -
session management - MFA.

------------------------------------------------------------------------

# 13. BACKEND

## Primary Backend: FastAPI

Use Python FastAPI as Pelora's primary API layer.

Why: - excellent Python AI ecosystem - asynchronous APIs - WebSocket
support - automatic OpenAPI documentation - strong scientific/geospatial
integration - easy integration with ML models.

Backend services:

api/ agents/ data/ geospatial/ forecast/ fishing/ safety/ routing/
ecosystem/ research/ reports/ notifications/ vessels/ missions/

------------------------------------------------------------------------

# 14. API ARCHITECTURE

Use REST for normal application APIs.

Example:

GET /api/v1/vessels GET /api/v1/missions GET /api/v1/pfz GET
/api/v1/ocean/conditions GET /api/v1/weather GET /api/v1/alerts

POST /api/v1/routes/optimize POST /api/v1/research/analyze POST
/api/v1/reports/generate POST /api/v1/ai/query

Use WebSockets/SSE for: - agent execution - live vessel updates - alert
streams - mission monitoring.

------------------------------------------------------------------------

# 15. API GATEWAY

Use: - NGINX or - Kong or - cloud API Gateway.

Responsibilities: - authentication - rate limiting - routing - request
logging - API versioning - throttling - CORS.

------------------------------------------------------------------------

# 16. PRIMARY DATABASE

## PostgreSQL

Use PostgreSQL as the system-of-record database.

Store: - users - organizations - vessels - missions - routes - alerts -
datasets - research studies - reports - agent executions - preferences -
collaboration - audit logs.

------------------------------------------------------------------------

# 17. GEOSPATIAL DATABASE

## PostGIS

Install PostGIS on PostgreSQL.

Use for: - vessel positions - routes - PFZ polygons - boundaries -
marine protected areas - AOIs - geofences - hazard polygons - spatial
queries - nearest-neighbor searches - intersections - buffers.

PostGIS should be a core part of Pelora.

------------------------------------------------------------------------

# 18. TIME-SERIES DATABASE

## TimescaleDB

Use TimescaleDB on PostgreSQL for: - SST observations - chlorophyll -
wind - wave height - vessel positions - sensor observations -
forecasts - risk time series.

Benefits: - efficient time-series queries - retention policies -
compression - continuous aggregates.

------------------------------------------------------------------------

# 19. VECTOR DATABASE

Recommended initially:

pgvector inside PostgreSQL.

Use for: - document embeddings - marine reports - advisories - research
documents - dataset metadata - semantic search - Pelora knowledge
retrieval.

Avoid introducing a separate vector database until scale requires it.

------------------------------------------------------------------------

# 20. OBJECT STORAGE

Use S3-compatible object storage.

AWS: Amazon S3

Alternative: MinIO for local/self-hosted deployments.

Store: - satellite imagery - raster datasets - GeoTIFF - NetCDF -
reports - uploaded documents - research artifacts - generated maps -
model artifacts.

------------------------------------------------------------------------

# 21. SEARCH

Use OpenSearch if full-text/geospatial search becomes large-scale.

Use it for: - marine advisories - reports - datasets - research
documents - vessel search - location search - semantic/hybrid search.

For MVP, PostgreSQL full-text search can be sufficient.

------------------------------------------------------------------------

# 22. CACHE

## Redis

Use Redis for: - API caching - sessions - rate limits - temporary AI
state - job queues - real-time state - frequently requested ocean
conditions.

Example: Cache: "Current SST near Ratnagiri" for a short period based on
data freshness.

Never cache live data longer than its acceptable freshness window.

------------------------------------------------------------------------

# 23. EVENT STREAMING

## Apache Kafka or Redpanda

Use for large-scale event streaming.

Events: vessel.position.updated weather.forecast.updated
ocean.observation.updated alert.created alert.escalated mission.started
mission.updated agent.execution.started agent.execution.completed
dataset.status.changed

For an MVP, Redis Streams can replace Kafka.

Recommended evolution:

MVP → Redis Streams Scale → Kafka/Redpanda

------------------------------------------------------------------------

# 24. TASK PROCESSING

Use:

Celery + Redis/RabbitMQ

or preferably:

Temporal

Temporal is recommended for complex long-running workflows such as: -
multi-agent research - report generation - satellite ingestion - route
optimization - alert workflows - data processing.

Use Celery if the team wants simpler initial implementation.

------------------------------------------------------------------------

# 25. MULTI-AGENT AI

## Recommended: LangGraph

Use LangGraph to build Pelora's agent orchestration layer.

Architecture:

User → Orchestrator → Planner Agent → Specialized Agents → Verification
→ Synthesis → Response

Agents:

Planner Agent Ocean Data Agent Satellite Agent Weather Agent Fishing
Agent Geospatial Agent Route Agent Risk Agent Ecosystem Agent Research
Agent Alert Agent Report Agent Verification Agent Synthesis Agent

------------------------------------------------------------------------

# 26. LLM LAYER

Use a provider abstraction rather than tightly coupling Pelora to one
model.

Create:

LLM Gateway

Responsibilities: - model selection - routing - fallback - token/cost
monitoring - safety policies - structured output - prompt versioning.

Possible models: - OpenAI models - Anthropic models - Google models -
local open-source models.

Use the strongest reasoning model for complex orchestration and
cheaper/faster models for simple classification/extraction.

------------------------------------------------------------------------

# 27. RAG

Use Retrieval-Augmented Generation for: - marine advisories - government
documents - scientific documents - dataset documentation - operational
manuals - research literature.

Pipeline:

Document → Chunk → Embed → pgvector → Retrieve → Rerank → LLM →
Citation.

Never allow RAG documents to silently override live observations.

------------------------------------------------------------------------

# 28. STRUCTURED AI OUTPUT

All agent outputs should use typed JSON/Pydantic schemas.

Example:

AgentResult: - status - data_sources - observations - derived_metrics -
confidence - timestamp - warnings - artifacts

This prevents free-form agent responses from breaking the application.

------------------------------------------------------------------------

# 29. AI GUARDRAILS

Implement: - schema validation - source validation - hallucination
checks - confidence thresholds - citation requirements - tool permission
control - prompt injection protection - output moderation - safety
escalation.

For safety-critical recommendations: AI → Verification → Human/Official
Advisory precedence.

------------------------------------------------------------------------

# 30. AI EXPLAINABILITY

Do not expose private chain-of-thought.

Instead expose: - agents used - tools used - datasets used - key
contributing factors - evidence - confidence - limitations - timestamps.

Create an Evidence Graph:

Source → Dataset → Agent → Analysis → Recommendation.

------------------------------------------------------------------------

# 31. MARINE DATA INGESTION

Create a dedicated ingestion service.

Pipeline:

External API/File → Collector → Validation → Normalization → Metadata →
Storage → Processing → Database → Agent availability.

Support: REST APIs WMS/WFS OGC services NetCDF GeoTIFF CSV JSON GeoJSON
GRIB Satellite products.

------------------------------------------------------------------------

# 32. SCIENTIFIC PYTHON STACK

Use:

NumPy Pandas Xarray SciPy GeoPandas Shapely Rasterio GDAL rioxarray
PyProj

For oceanographic data: xarray + NetCDF/GRIB tooling should be a core
component.

------------------------------------------------------------------------

# 33. MACHINE LEARNING

Use:

scikit-learn XGBoost PyTorch

Potential models:

PFZ ranking anomaly detection risk prediction forecast correction route
risk ecosystem health event classification.

Start with interpretable statistical/ML models before complex deep
learning.

------------------------------------------------------------------------

# 34. PFZ ENGINE

Create a dedicated Fishing Intelligence service.

Inputs: SST chlorophyll SST fronts currents bathymetry historical
productivity weather waves vessel constraints.

Output:

FishingOpportunityScore

with: biological potential operational suitability historical support
confidence uncertainty.

Separate: Raw Biological Potential from Operationally Adjusted
Potential.

------------------------------------------------------------------------

# 35. SAFETY ENGINE

Create a dedicated Risk Engine.

Inputs: wind waves lightning rain cyclone visibility tide boundaries
vessel route forecast uncertainty.

Output: MarineRiskScore RiskTrajectory HazardExposure RecommendedAction
Confidence.

Never treat an AI-generated score as an official safety certification.

------------------------------------------------------------------------

# 36. ROUTE ENGINE

Use:

Graph/H3-based spatial routing + PostGIS + weather/ocean cost surfaces.

Potential technologies: - pgRouting - OR-Tools - custom A\*/Dijkstra -
NetworkX for prototyping.

Route cost can combine: distance time wave exposure wind exposure
current hazards restricted areas vessel constraints.

Generate: Safest Fastest Efficient Balanced.

------------------------------------------------------------------------

# 37. H3 GEOSPATIAL INDEXING

Use Uber H3 for large-scale marine spatial indexing.

Useful for: - ocean grids - heatmaps - anomaly detection - PFZ ranking -
vessel density - ecosystem aggregation - regional statistics.

H3 allows efficient spatial aggregation without querying millions of raw
geometries repeatedly.

------------------------------------------------------------------------

# 38. MAP TILE PIPELINE

For large datasets use: - vector tiles - raster tiles - Cloud Optimized
GeoTIFF - PMTiles where appropriate.

Potential tools: Tippecanoe TileServer GL GeoServer TiTiler.

Recommended raster architecture: Cloud Optimized GeoTIFF → TiTiler →
MapLibre.

------------------------------------------------------------------------

# 39. WEATHER / OCEAN FORECAST PIPELINE

Separate: Observation Forecast Derived Modelled.

Never mix these categories in the database.

Data model should include: source dataset timestamp valid_time geometry
variable value unit quality resolution forecast/observation flag.

------------------------------------------------------------------------

# 40. NOTIFICATION SYSTEM

Backend: Redis/Kafka + Notification service.

Channels: in-app Web Push mobile push email SMS/WhatsApp where
legally/technically supported.

Priority: Critical Warning Advisory Informational.

Implement alert deduplication and escalation.

------------------------------------------------------------------------

# 41. OFFLINE ARCHITECTURE

For field users:

Frontend: PWA/React Native

Local storage: IndexedDB / SQLite

Cache: mission route last validated marine data critical alerts map
tiles.

Synchronization: Local Queue → API → Conflict Resolver → Server.

Every offline value must display its last update time.

------------------------------------------------------------------------

# 42. COLLABORATION

Use: WebSockets PostgreSQL Redis

Features: shared missions annotations comments shared maps decision logs
incident rooms research collaboration.

For complex collaborative editing, consider Yjs.

------------------------------------------------------------------------

# 43. AUTHORIZATION

Use RBAC initially.

Roles: Fisher Researcher Authority Operator Fleet Manager Environmental
Analyst Admin.

For more complex enterprise permissions: RBAC + ABAC.

Permissions should control: data access mission actions fleet visibility
research projects reports administrative functions.

------------------------------------------------------------------------

# 44. SECURITY

Implement: HTTPS JWT/OIDC MFA RBAC rate limiting input validation
encrypted secrets database encryption object-storage policies audit
logging API security dependency scanning.

Never expose: API keys LLM credentials private dataset credentials
internal agent prompts system secrets.

------------------------------------------------------------------------

# 45. AUDIT LOGGING

Record: login data access mission changes route changes AI
recommendations human approvals alert acknowledgement report generation
dataset changes admin changes.

Important decision record:

AI Recommendation → Evidence → Human Decision → Timestamp → Outcome.

------------------------------------------------------------------------

# 46. OBSERVABILITY

Use:

OpenTelemetry Prometheus Grafana Loki Sentry.

Monitor: API latency agent latency LLM latency token usage data
ingestion failures dataset freshness WebSocket connections route
calculations alert delivery database performance.

------------------------------------------------------------------------

# 47. AI OBSERVABILITY

Track: agent success rate agent latency tool failures model usage token
cost verification rate fallback rate confidence distribution
hallucination/validation failures.

Create dashboards for: Agent Health Data Health Model Health System
Health.

------------------------------------------------------------------------

# 48. DEPLOYMENT

## Local Development

Docker Compose: Frontend Backend PostgreSQL/PostGIS TimescaleDB Redis
MinIO Worker LLM gateway.

## Production

Recommended: Kubernetes

Services: frontend api agent-orchestrator workers data-ingestion
geospatial routing notification report-generation.

------------------------------------------------------------------------

# 49. CLOUD

Any major cloud works.

Recommended AWS architecture:

CloudFront → ALB → EKS → FastAPI services

Data: RDS PostgreSQL/PostGIS/TimescaleDB S3 ElastiCache Redis MSK Kafka
OpenSearch CloudWatch/OpenTelemetry.

For a student/SIH MVP, avoid overengineering.

A simpler deployment: Vercel → Next.js Railway/Render/AWS → FastAPI
Managed PostgreSQL → PostGIS Redis → managed Redis S3 → object storage.

------------------------------------------------------------------------

# 50. CI/CD

Use GitHub Actions.

Pipeline:

Pull Request → Lint → Type Check → Unit Tests → Integration Tests →
Security Scan → Build → Docker → Deploy.

Frontend: ESLint TypeScript Vitest Playwright.

Backend: Ruff MyPy Pytest Pydantic validation.

------------------------------------------------------------------------

# 51. TESTING

## Frontend

Vitest React Testing Library Playwright

## Backend

Pytest HTTPX Testcontainers

## Geospatial

Golden GeoJSON tests PostGIS integration tests Raster validation

## AI

Prompt regression tests Schema validation Tool-use tests Golden-answer
datasets Citation verification Safety evaluation.

------------------------------------------------------------------------

# 52. RECOMMENDED REPOSITORY

Use a monorepo:

pelora/ apps/ web/ mobile/ api/ agents/ orchestrator/ planner/ ocean/
weather/ fishing/ risk/ route/ ecosystem/ research/ verification/
services/ ingestion/ geospatial/ notifications/ reports/ packages/ ui/
types/ config/ data/ schemas/ migrations/ infrastructure/ docker/
kubernetes/ terraform/ docs/

------------------------------------------------------------------------

# 53. CORE DOMAIN SERVICES

Recommended backend boundaries:

1.  Identity Service
2.  User/Profile Service
3.  Vessel Service
4.  Mission Service
5.  Ocean Data Service
6.  Weather Service
7.  Fishing Intelligence Service
8.  Safety/Risk Service
9.  Route Service
10. Ecosystem Service
11. Research Service
12. Report Service
13. Alert Service
14. Collaboration Service
15. Data Provenance Service
16. Agent Orchestration Service.

For MVP, these can initially live inside one FastAPI application using
clean modules. Split into microservices only when scaling requires it.

------------------------------------------------------------------------

# 54. MVP TECH STACK

If building Pelora quickly for a hackathon, use:

Frontend: Next.js React TypeScript Tailwind shadcn/ui MapLibre deck.gl
ECharts Zustand TanStack Query

Backend: FastAPI Python Pydantic SQLAlchemy

Database: PostgreSQL PostGIS TimescaleDB pgvector

AI: LangGraph LLM API Pydantic structured outputs

Data: xarray GeoPandas Rasterio GDAL

Real-time: WebSockets Redis

Storage: S3/MinIO

Deployment: Vercel + Render/Railway/AWS

Monitoring: Sentry + OpenTelemetry

This is enough to create a convincing functional prototype.

------------------------------------------------------------------------

# 55. PRODUCTION TECH STACK

For a scalable deployment:

Frontend: Next.js + TypeScript

Backend: FastAPI + Python

Agent orchestration: LangGraph + Temporal

Databases: PostgreSQL/PostGIS/TimescaleDB pgvector OpenSearch

Streaming: Kafka/Redpanda

Cache: Redis

Geospatial: GDAL Rasterio GeoPandas H3 TiTiler MapLibre deck.gl

ML: PyTorch XGBoost scikit-learn

Storage: S3

Infrastructure: Docker Kubernetes Terraform

Observability: OpenTelemetry Prometheus Grafana Loki Sentry

CI/CD: GitHub Actions

------------------------------------------------------------------------

# 56. RECOMMENDED DATA FLOW

External Marine Sources ↓ Data Ingestion Layer ↓ Validation & Quality
Engine ↓ Object Storage + PostgreSQL/PostGIS/TimescaleDB ↓ H3 Spatial
Index ↓ Specialized Agents ↓ Analytics / ML / Geospatial Engines ↓
Verification Agent ↓ Evidence + Provenance Layer ↓ Pelora Orchestrator ↓
FastAPI ↓ Next.js ↓ User

------------------------------------------------------------------------

# 57. REAL-TIME DATA FLOW

Marine API ↓ Collector ↓ Normalizer ↓ Validator ↓ Event Bus ↓ Database /
Cache ↓ Relevant Agent ↓ Risk/Fishing/Route Engine ↓ Alert Engine ↓
WebSocket ↓ Pelora UI

------------------------------------------------------------------------

# 58. AI QUERY FLOW

User: "Is it safe to fish tomorrow near Ratnagiri?"

↓

Intent Detection

↓

Planner Agent

↓

Parallel execution: Ocean Agent Weather Agent Fishing Agent Geospatial
Agent

↓

Risk Agent

↓

Verification Agent

↓

Evidence aggregation

↓

Synthesis Agent

↓

Structured response:

Answer Score Map Factors Confidence Sources Recommendation

↓

Frontend

------------------------------------------------------------------------

# 59. DATABASE DOMAIN MODEL

Core tables:

users organizations roles vessels missions mission_events routes
route_waypoints alerts alert_events ocean_observations weather_forecasts
marine_advisories pfz_zones ecosystem_indicators datasets data_sources
data_quality data_lineage agent_executions agent_artifacts
research_projects research_findings reports annotations comments
audit_logs notifications.

Use PostGIS geometry/geography types wherever spatial information is
involved.

------------------------------------------------------------------------

# 60. DATA PROVENANCE MODEL

Every important derived value should have:

source_id dataset_id observation_time ingestion_time processing_version
agent_id model_version quality_score confidence lineage_id.

This is critical for Pelora's trust architecture.

------------------------------------------------------------------------

# 61. API RESPONSE STANDARD

Use a common structure:

{ "data": {}, "meta": { "timestamp": "...", "freshness": "...",
"sources": \[\], "confidence": "...", "version": "..." }, "warnings":
\[\] }

This makes all Pelora modules consistent.

------------------------------------------------------------------------

# 62. DESIGN-TO-TECH CONNECTION

Every major frontend page should map to backend capabilities.

Command Center: Dashboard Aggregator + Live Data

Ask Pelora: Agent Orchestrator

Ocean Map: Geospatial Service

Fishing Intelligence: PFZ Engine

Safety: Risk Engine + Alert Engine

Route Planner: Routing Engine

Ocean Analytics: Analytics Engine

Ecosystem: Ecosystem Engine

Research: Research Service

Reports: Report Generation Service

Missions: Mission Service

Alerts: Alert Service

Data Sources: Data Provenance Service

Agent Observatory: Agent Telemetry

Vessel Intelligence: Vessel + AIS Service

Historical Explorer: Time-Series + Historical Data Service

Collaboration: Realtime Collaboration Service

------------------------------------------------------------------------

# 63. DEVELOPMENT PRIORITY

## Phase 1 --- Foundation

Next.js FastAPI PostgreSQL/PostGIS Authentication Pelora UI system
MapLibre Basic data ingestion.

## Phase 2 --- Marine Intelligence

SST chlorophyll weather waves PFZ map layers historical data.

## Phase 3 --- AI

LangGraph Ask Pelora tool calling structured outputs RAG evidence.

## Phase 4 --- Safety

Risk engine alerts cyclone geofencing vessel exposure.

## Phase 5 --- Operations

Route planner missions vessel tracking dynamic monitoring.

## Phase 6 --- Advanced Intelligence

Anomaly detection ecosystem health historical ocean memory what-if
simulation digital twin.

## Phase 7 --- Trust

Data lineage verification confidence audit trail agent observability.

## Phase 8 --- Production

Offline mode mobile scaling security observability Kubernetes.

------------------------------------------------------------------------

# 64. WHAT NOT TO OVERENGINEER

For the SIH prototype, do NOT immediately build: - dozens of
microservices - Kubernetes - Kafka cluster - complex MLOps platform -
custom foundation model - custom map engine - custom vector database -
complex digital twin physics simulation.

Instead build convincing end-to-end vertical slices.

Example:

Real marine data → ingestion → PFZ analysis → agent reasoning → verified
recommendation → map → route → mission → alert.

A working vertical slice is more valuable than 30 disconnected services.

------------------------------------------------------------------------

# 65. WINNING-LEVEL ARCHITECTURE

The strongest Pelora architecture is:

                 ┌─────────────────────┐
                 │      PELORA UI      │
                 │ Next.js / MapLibre  │
                 └──────────┬──────────┘
                            │
                    API / WebSocket
                            │
                 ┌──────────▼──────────┐
                 │    API / ORCHESTRATOR│
                 │ FastAPI + LangGraph │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
     AI AGENTS         GEO ENGINE        RISK ENGINE
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                 ┌──────────▼──────────┐
                 │ DATA / EVENT LAYER  │
                 │ Redis + Kafka       │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
      PostgreSQL         Timescale          Object Store
      + PostGIS          + pgvector            S3
          │                 │                  │
          └─────────────────┼──────────────────┘
                            │
                 ┌──────────▼──────────┐
                 │ MARINE DATA SOURCES │
                 │ Satellite / Ocean   │
                 │ Weather / GIS / AIS │
                 └─────────────────────┘

------------------------------------------------------------------------

# 66. FINAL RECOMMENDATION

For the Pelora/SIH build, the best balance is:

### Frontend

Next.js + TypeScript + Tailwind + shadcn/ui + MapLibre + deck.gl +
ECharts + Zustand + TanStack Query

### Backend

FastAPI + Python + SQLAlchemy + Pydantic

### AI

LangGraph + LLM Gateway + structured Pydantic outputs + RAG +
verification layer

### Database

PostgreSQL + PostGIS + TimescaleDB + pgvector

### Data Engineering

xarray + GeoPandas + Rasterio + GDAL + H3

### Real-Time

WebSockets + Redis initially; Kafka/Redpanda at scale

### Workflow

Temporal for complex workflows; Celery for simpler MVP background jobs

### Storage

S3/MinIO

### Maps

MapLibre + deck.gl + vector/raster tiles + TiTiler

### ML

scikit-learn + XGBoost + PyTorch

### DevOps

Docker + GitHub Actions; Kubernetes only when production scale requires
it

### Observability

OpenTelemetry + Prometheus + Grafana + Sentry

This stack gives Pelora the technical foundation for its core promise:

**LIVE MARINE DATA + GEOSPATIAL INTELLIGENCE + MULTI-AGENT REASONING +
VERIFICATION + ACTIONABLE DECISIONS.**
