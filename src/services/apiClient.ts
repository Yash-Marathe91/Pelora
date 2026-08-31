export interface BackendVessel {
  mmsi: string;
  vessel_name: string;
  vessel_type: string;
  position: {
    latitude: number;
    longitude: number;
  };
  telemetry: {
    sog_knots: number;
    cog_degrees: number;
    nav_status: string;
  };
  flag: string;
  callsign: string;
  timestamp: string;
  data_source: string;
}

export interface BackendCopernicusRaster {
  product_id: string;
  bounding_box: {
    lat_min: number;
    lat_max: number;
    lon_min: number;
    lon_max: number;
  };
  point_count: number;
  grid_data: Array<{
    latitude: number;
    longitude: number;
    sst_celsius?: number;
    chlorophyll_mg_m3?: number;
    ssha_meters?: number;
    salinity_psu?: number;
  }>;
  extracted_at: string;
}

export interface BackendIngestResult {
  status: string;
  provider_count: number;
  results: Array<{
    provider: string;
    dataset_type: string;
    records_count: number;
    cache_hit: boolean;
    records: Array<{
      provider_name: string;
      dataset_type: string;
      latitude: number;
      longitude: number;
      payload: any;
      confidence_score: number;
      quality_grade: string;
    }>;
  }>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export class PeloraApiClient {
  /**
   * Trigger backend live multi-provider data ingestion pipeline (WeatherAPI, Stormglass, Copernicus, INCOIS)
   */
  static async triggerDataIngestion(latitude = 16.44, longitude = 72.82): Promise<BackendIngestResult | null> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/datasets/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude,
          longitude,
          force_refresh: true,
        }),
      });

      if (!res.ok) {
        console.warn('Backend ingestion pipeline response not OK, using simulated data layer');
        return null;
      }
      return await res.json();
    } catch (err) {
      console.warn('Backend API connection offline, falling back to dynamic simulated stream:', err);
      return null;
    }
  }

  /**
   * Fetch live AIS vessel telemetry stream from backend
   */
  static async fetchLiveAISVessels(): Promise<BackendVessel[]> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/integrations/ais/vessels`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.vessels || [];
    } catch (err) {
      console.warn('Live AIS stream fetch error, returning fallback fleet:', err);
      return [];
    }
  }

  /**
   * Extract high-resolution Copernicus satellite raster grid from backend
   */
  static async fetchCopernicusRaster(
    latMin = 15.5,
    latMax = 17.5,
    lonMin = 71.5,
    lonMax = 73.8
  ): Promise<BackendCopernicusRaster | null> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/integrations/copernicus/raster`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat_min: latMin,
          lat_max: latMax,
          lon_min: lonMin,
          lon_max: lonMax,
          variables: ['sst', 'chlorophyll_a', 'ssha'],
        }),
      });

      if (!res.ok) return null;
      const data = await res.json();
      return data.raster_data || null;
    } catch (err) {
      console.warn('Copernicus raster fetch error:', err);
      return null;
    }
  }

  /**
   * Fetch backend system readiness and data provider status
   */
  static async fetchSystemReadiness() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/readiness`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  /**
   * Execute natural language query via backend Multi-Agent AI Reasoning engine
   */
  static async executeAIQuery(
    queryText: string,
    region = 'Arabian Sea (Ratnagiri)',
    vesselType = 'Deep-Sea Trawler (18m)',
    forecastHorizon = '24 Hours',
    priority = 'Balanced (Safety + Yield)'
  ) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          region,
          vessel_type: vesselType,
          forecast_horizon: forecastHorizon,
          priority,
        }),
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Backend AI query endpoint error, falling back to local synthesis:', err);
      return null;
    }
  }
}

