import {
  OceanObservation,
  AgentExecutionTelemetry,
  EvidenceItem,
  PFZZone,
  MarineAlert,
  Vessel
} from '@/types/pelora';

export class MarineDataService {
  /**
   * Get current ocean observation parameters for main coastal region
   */
  static getLiveOceanConditions(): OceanObservation {
    return {
      id: 'obs-arabian-sea-central',
      locationName: 'Ratnagiri - Goa Offshore Sector (72.8°E, 16.4°N)',
      coordinates: [72.82, 16.44],
      sst: 27.4,
      chlorophyll: 1.82,
      waveHeight: 0.9,
      wavePeriod: 6.2,
      windSpeed: 14.5,
      windDirection: 'SW (225°)',
      salinity: 35.8,
      currentSpeed: 1.2,
      currentDirection: 'SSE (155°)',
      dissolvedOxygen: 5.4,
      ph: 8.12,
      updatedAt: '14 minutes ago (INCOIS / Oceansat-3 Sync)',
    };
  }

  /**
   * Get list of top PFZ (Potential Fishing Zones)
   */
  static getTopPFZones(): PFZZone[] {
    return [
      {
        id: 'pfz-01',
        zoneCode: 'PFZ-AR-09',
        regionName: 'Ratnagiri South Deep Slope',
        centerCoordinates: [72.45, 16.15],
        potentialScore: 92,
        biologicalScore: 94,
        operationalScore: 89,
        dominantSpecies: ['Indian Mackerel', 'Skipjack Tuna', 'Sardinella'],
        depthMeters: 85,
        distanceFromShoreKm: 28.4,
        bestWindow: '05:30 AM - 11:30 AM IST',
        expectedCatchKgPerTrip: 450,
        sstGradient: '27.1°C -> 27.9°C Frontal Convergence',
        chlorophyllBloom: '2.10 mg/m³ High Concentration',
        safetyStatus: 'optimal',
      },
      {
        id: 'pfz-02',
        zoneCode: 'PFZ-AR-14',
        regionName: 'Malvan Bank Thermal Front',
        centerCoordinates: [73.12, 15.82],
        potentialScore: 86,
        biologicalScore: 88,
        operationalScore: 84,
        dominantSpecies: ['Kingfish', 'Squid', 'Horse Mackerel'],
        depthMeters: 52,
        distanceFromShoreKm: 18.2,
        bestWindow: '06:00 AM - 01:00 PM IST',
        expectedCatchKgPerTrip: 380,
        sstGradient: '27.3°C -> 27.8°C Sharp Front',
        chlorophyllBloom: '1.75 mg/m³ Moderate Bloom',
        safetyStatus: 'optimal',
      },
      {
        id: 'pfz-03',
        zoneCode: 'PFZ-GUJ-04',
        regionName: 'Veraval Outer Continental Shelf',
        centerCoordinates: [70.18, 20.45],
        potentialScore: 78,
        biologicalScore: 82,
        operationalScore: 71,
        dominantSpecies: ['Ribbonfish', 'Croaker', 'Cuttlefish'],
        depthMeters: 110,
        distanceFromShoreKm: 42.0,
        bestWindow: '04:00 AM - 10:00 AM IST',
        expectedCatchKgPerTrip: 520,
        sstGradient: '26.8°C Upwelling Zone',
        chlorophyllBloom: '2.45 mg/m³ Heavy Algal Plume',
        safetyStatus: 'moderate',
      },
    ];
  }

  /**
   * Get active marine alerts
   */
  static getActiveAlerts(): MarineAlert[] {
    return [
      {
        id: 'alt-101',
        title: 'Thermal Front Convergence & Wind Shift Notice',
        severity: 'advisory',
        category: 'weather',
        region: 'Central Arabian Sea (Ratnagiri Offshore)',
        issuedAt: '35m ago',
        expiresAt: 'In 18 hours',
        summary: 'A localized thermal gradient of 0.8°C/km has formed alongside a mild SW wind acceleration.',
        recommendedAction: 'Small craft should maintain speed under 12 knots when crossing frontal ripples.',
        affectedVesselsCount: 14,
        acknowledged: false,
      },
      {
        id: 'alt-102',
        title: 'Squall Line Risk After 15:30 UTC',
        severity: 'caution',
        category: 'wave',
        region: 'South Konkan Coast',
        issuedAt: '1h ago',
        expiresAt: 'In 12 hours',
        summary: 'Forecast models indicate wave heights rising from 0.9m to 1.8m due to squall line activity.',
        recommendedAction: 'Complete morning harvesting missions before 14:00 IST.',
        affectedVesselsCount: 28,
        acknowledged: true,
      },
    ];
  }

  /**
   * Get validated evidence sources powering current AI inferences
   */
  static getEvidenceSources(): EvidenceItem[] {
    return [
      {
        id: 'ev-01',
        title: 'Oceansat-3 Ocean Color Monitor (OCM-3)',
        sourceName: 'ISRO / INCOIS Satellite Telemetry',
        sourceType: 'satellite',
        timestamp: 'Today at 07:15 UTC',
        reliabilityScore: 98,
        freshness: '14 minutes ago',
        keyFinding: 'High chlorophyll concentration (1.82 - 2.10 mg/m³) verified across Ratnagiri South corridor.',
      },
      {
        id: 'ev-02',
        title: 'INSAT-3DR Sea Surface Temperature Product',
        sourceName: 'India Meteorological Department (IMD)',
        sourceType: 'satellite',
        timestamp: 'Today at 07:30 UTC',
        reliabilityScore: 96,
        freshness: '22 minutes ago',
        keyFinding: 'Thermal boundary detected at 16.15°N latitude with 0.8°C gradient delta.',
      },
      {
        id: 'ev-03',
        title: 'Arabian Sea Moored Ocean Buoy AS-04',
        sourceName: 'National Institute of Ocean Technology (NIOT)',
        sourceType: 'buoy',
        timestamp: 'Continuous real-time (5m interval)',
        reliabilityScore: 99,
        freshness: '3 minutes ago',
        keyFinding: 'Surface wave height 0.9m, surface temperature 27.4°C, subsurface current 1.2 knots.',
      },
      {
        id: 'ev-04',
        title: 'Wave Watch III Coastal Numerical Hydrodynamic Model',
        sourceName: 'INCOIS Geospatial Forecast Engine',
        sourceType: 'model',
        timestamp: 'Model Run 06:00 UTC',
        reliabilityScore: 94,
        freshness: '1 hour ago',
        keyFinding: 'Favourable wave period (6.2s) expected to persist through 14:00 IST.',
      },
    ];
  }

  /**
   * Dynamic multi-agent AI execution simulator based on user query
   */
  static simulateAgentExecution(query: string): AgentExecutionTelemetry {
    const queryLower = query.toLowerCase();
    
    let synthOutput = 'Recommendation: Depart before 06:30 AM IST. Target Zone PFZ-AR-09 for 92/100 potential catch yield.';
    let confidence = 94;

    if (queryLower.includes('squall') || queryLower.includes('safety') || queryLower.includes('cyclone') || queryLower.includes('wind')) {
      synthOutput = 'Hazard Alert: Wave surge reaching 1.8m past 15:30 IST. Maintain coastal corridor; return to jetty by 14:00 IST.';
      confidence = 91;
    } else if (queryLower.includes('pfz') || queryLower.includes('fish') || queryLower.includes('catch') || queryLower.includes('harvest')) {
      synthOutput = 'PFZ Priority: Zone PFZ-AR-09 (85m depth) exhibits 2.10 mg/m³ chlorophyll bloom. Estimated yield: 450kg Indian Mackerel & Skipjack Tuna.';
      confidence = 96;
    } else if (queryLower.includes('route') || queryLower.includes('waypoint') || queryLower.includes('path')) {
      synthOutput = 'Safest Transit Path: 52 NM route calculated from Ratnagiri Jetty via 2 intermediate deep water waypoints. Estimated fuel: 124L.';
      confidence = 95;
    }

    return {
      id: `exec-${Date.now()}`,
      query,
      status: 'completed',
      totalDurationMs: 1420,
      overallConfidence: confidence,
      validatedSourcesCount: 4,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      steps: [
        {
          agentName: 'Planner Agent',
          agentRole: 'Goal Decomposition & Workflow Dispatcher',
          task: `Parsed query "${query}" into sub-tasks for hydrographic, meteorological & biological agents.`,
          toolUsed: 'QueryDecomposer.v2',
          status: 'completed',
          durationMs: 140,
          outputSnippet: 'Identified target ocean region, active satellite passes, and relevant buoy telemetry feeds.',
          confidenceScore: 99,
        },
        {
          agentName: 'Ocean Data Agent',
          agentRole: 'Satellite & In-Situ Hydrographic Synthesizer',
          task: 'Queried ISRO Oceansat-3 OCM-3 chlorophyll bloom & INSAT-3DR SST thermal boundary layers.',
          toolUsed: 'INCOIS_Oceansat3_Connector',
          status: 'completed',
          durationMs: 380,
          outputSnippet: 'SST 27.4°C with active frontal line at 16.15°N. Chlorophyll bloom peak 1.82 - 2.10 mg/m³.',
          confidenceScore: 96,
        },
        {
          agentName: 'Weather & Risk Agent',
          agentRole: 'Meteorological & Sea State Hazards Monitor',
          task: 'Evaluated WaveWatch III wave period, wind shear vectors, and squall probability grid.',
          toolUsed: 'WaveWatch3_RiskEvaluator',
          status: 'completed',
          durationMs: 420,
          outputSnippet: 'Surface wave 0.9m. Swell period 6.2s. Coastal safety index 84/100.',
          confidenceScore: 93,
        },
        {
          agentName: 'Verification & Synthesis Agent',
          agentRole: 'Cross-Source Validation & Decision Briefing',
          task: 'Validated findings against NIOT Moored Buoy AS-04 telemetry & computed final operational brief.',
          toolUsed: 'Pelora_EvidenceGraph_Validator',
          status: 'completed',
          durationMs: 480,
          outputSnippet: synthOutput,
          confidenceScore: confidence,
        },
      ],
    };
  }

  /**
   * Sample active vessels in Arabian Sea
   */
  static getActiveVessels(): Vessel[] {
    return [
      {
        id: 'vsl-4192',
        mmsi: '419000182',
        name: 'Sagar Ratna II',
        type: 'trawler',
        homePort: 'Ratnagiri Port',
        coordinates: [72.78, 16.32],
        speedKnots: 8.4,
        heading: 215,
        status: 'active',
        safetyScore: 92,
        crewCount: 7,
        lastPing: '2m ago',
      },
      {
        id: 'vsl-4198',
        mmsi: '419000441',
        name: 'Matsya Kanya 04',
        type: 'gillnetter',
        homePort: 'Malvan Jetty',
        coordinates: [73.05, 15.95],
        speedKnots: 6.2,
        heading: 180,
        status: 'transit',
        safetyScore: 88,
        crewCount: 5,
        lastPing: '4m ago',
      },
      {
        id: 'vsl-9012',
        mmsi: '419992010',
        name: 'ORCA Explorer (Research)',
        type: 'research',
        homePort: 'Goa Harbor',
        coordinates: [73.40, 15.42],
        speedKnots: 11.0,
        heading: 270,
        status: 'active',
        safetyScore: 98,
        crewCount: 14,
        lastPing: '1m ago',
      },
    ];
  }
}
