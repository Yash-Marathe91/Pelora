export type PageId =
  | 'landing'
  | 'ask'
  | 'map'
  | 'fishing'
  | 'safety'
  | 'routes'
  | 'analytics'
  | 'ecosystem'
  | 'research'
  | 'reports'
  | 'missions'
  | 'alerts'
  | 'data'
  | 'agents'
  | 'vessels'
  | 'historical'
  | 'collaboration'
  | 'auth'
  | 'settings'
  | 'mobile';

export type AlertSeverity = 'info' | 'advisory' | 'caution' | 'warning' | 'critical';

export interface MarineMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'safe' | 'warning' | 'critical' | 'neutral';
  timestamp?: string;
}

export interface OceanObservation {
  id: string;
  locationName: string;
  coordinates: [number, number]; // [lon, lat]
  sst: number; // °C
  chlorophyll: number; // mg/m³
  waveHeight: number; // m
  wavePeriod: number; // s
  windSpeed: number; // km/h or knots
  windDirection: string;
  salinity: number; // PSU
  currentSpeed: number; // knots
  currentDirection: string;
  dissolvedOxygen: number; // mg/L
  ph: number;
  updatedAt: string;
}

export interface AgentExecutionStep {
  agentName: string;
  agentRole: string;
  task: string;
  toolUsed: string;
  status: 'running' | 'completed' | 'warning' | 'queued';
  durationMs: number;
  outputSnippet: string;
  confidenceScore: number;
}

export interface AgentExecutionTelemetry {
  id: string;
  query: string;
  status: 'planning' | 'executing' | 'verifying' | 'completed' | 'failed';
  totalDurationMs: number;
  steps: AgentExecutionStep[];
  overallConfidence: number;
  validatedSourcesCount: number;
  timestamp: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  sourceName: string; // e.g. "INCOIS Satellite Altimetry", "NOAA Coral Reef Watch", "Arabian Sea Buoy 04"
  sourceType: 'satellite' | 'buoy' | 'model' | 'advisory' | 'historical';
  timestamp: string;
  reliabilityScore: number; // 0 - 100
  freshness: string; // e.g. "12m ago"
  citationUrl?: string;
  keyFinding: string;
}

export interface PFZZone {
  id: string;
  zoneCode: string;
  regionName: string;
  centerCoordinates: [number, number];
  potentialScore: number; // 0-100
  biologicalScore: number;
  operationalScore: number;
  dominantSpecies: string[];
  depthMeters: number;
  distanceFromShoreKm: number;
  bestWindow: string; // e.g., "05:30 - 11:00 AM IST"
  expectedCatchKgPerTrip: number;
  sstGradient: string; // e.g. "27.2°C -> 28.1°C Front"
  chlorophyllBloom: string; // e.g. "1.92 mg/m³ High"
  safetyStatus: 'optimal' | 'moderate' | 'high-risk';
}

export interface MarineAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  category: 'weather' | 'wave' | 'cyclone' | 'boundary' | 'ecosystem' | 'vessel';
  region: string;
  issuedAt: string;
  expiresAt: string;
  summary: string;
  recommendedAction: string;
  affectedVesselsCount?: number;
  acknowledged?: boolean;
}

export interface Vessel {
  id: string;
  mmsi: string;
  name: string;
  type: 'trawler' | 'gillnetter' | 'research' | 'coastguard' | 'cargo';
  homePort: string;
  coordinates: [number, number];
  speedKnots: number;
  heading: number;
  status: 'active' | 'anchored' | 'transit' | 'emergency';
  safetyScore: number;
  crewCount: number;
  lastPing: string;
}
