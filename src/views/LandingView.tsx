import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { MarineDataService } from '@/services/marineDataService';
import {
  Sparkles,
  Compass,
  Map as MapIcon,
  Fish,
  ShieldAlert,
  Navigation,
  BarChart3,
  Waves,
  Microscope,
  FileText,
  Anchor,
  Bell,
  Database,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Activity,
  Zap,
  Globe,
  TrendingUp,
  ShieldCheck,
  Radio,
  User,
  LogIn,
} from 'lucide-react';
import { MapShell } from '@/components/maps/MapShell';
import { MarineMetricCard } from '@/components/ui/MarineMetricCard';
import { SafetyScoreGauge } from '@/components/ui/SafetyScoreGauge';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';
import { AgentTimeline } from '@/components/agents/AgentTimeline';
import { EvidenceCard } from '@/components/evidence/EvidenceCard';

export const LandingView: React.FC = () => {
  const { setActivePage, toggleAskModal, runAIQuery, telemetryRun } = usePeloraStore();
  const [activeScenario, setActiveScenario] = useState<'fishing' | 'safety' | 'ecosystem'>('fishing');
  const [heroPromptInput, setHeroPromptInput] = useState("Is it safe to fish offshore Ratnagiri tomorrow morning?");

  const liveObs = MarineDataService.getLiveOceanConditions();
  const topPFZ = MarineDataService.getTopPFZones()[0];
  const evidenceList = MarineDataService.getEvidenceSources();

  const handleHeroPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPromptInput.trim()) return;
    runAIQuery(heroPromptInput);
    setActivePage('ask');
  };

  return (
    <div className="min-h-screen bg-[#06131A] text-[#EAF6F7] font-sans selection:bg-[#39D6D0] selection:text-[#06131A]">
      {/* PUBLIC HEADER NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#06131A]/90 backdrop-blur-md border-b border-[#24404A] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage('landing')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#39D6D0] to-[#116579] flex items-center justify-center text-[#06131A] font-bold font-manrope shadow-md group-hover:scale-105 transition-transform">
            P
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-wider font-manrope text-[#EAF6F7] group-hover:text-[#39D6D0] transition-colors">
              PELORA
            </span>
            <span className="text-[10px] block font-data-label text-[#39D6D0] font-semibold tracking-widest uppercase">
              ORCA MARINE INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Public Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold font-manrope text-[#9BB3B8]">
          <a href="#overview" className="hover:text-[#EAF6F7] transition-colors">Overview</a>
          <a href="#canvas" className="hover:text-[#EAF6F7] transition-colors">Live Canvas</a>
          <a href="#capabilities" className="hover:text-[#EAF6F7] transition-colors">Capabilities</a>
          <a href="#evidence" className="hover:text-[#EAF6F7] transition-colors">Data Feeds</a>
          <a href="#scenarios" className="hover:text-[#EAF6F7] transition-colors">Scenarios</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActivePage('auth')}
            className="px-4 py-2 text-xs font-bold font-manrope text-[#9BB3B8] hover:text-[#EAF6F7] bg-[#081C24] hover:bg-[#0B2630] border border-[#24404A] rounded-xl transition-all flex items-center space-x-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-[#39D6D0]" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => setActivePage('map')}
            className="px-5 py-2 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-extrabold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-lg"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="space-y-20 pb-24 pt-8">
        {/* SECTION 1: HERO SECTION */}
        <section id="overview" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Bioluminescent Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-biolum-radial pointer-events-none -z-10" />

          {/* Top Status Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#081C24] border border-[#39D6D0]/30 text-xs font-data-label mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#75E6B5] animate-ping" />
            <span className="text-[#EAF6F7] font-medium">ORCA Marine Intelligence Platform</span>
            <span className="text-[#24404A]">|</span>
            <span className="text-[#39D6D0] font-semibold">Arabian Sea Grid Live</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold font-manrope tracking-tight text-[#EAF6F7] max-w-4xl mx-auto leading-tight">
            PELORA — Marine Intelligence, <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">powered by collaborative AI.</span>
          </h1>

          {/* Core Subtitle & Vision */}
          <p className="mt-5 text-lg sm:text-xl text-[#9BB3B8] max-w-3xl mx-auto font-body leading-relaxed">
            Understand the ocean. Decide with confidence. Turn fragmented satellite, oceanographic, and meteorological data into explainable decisions for fisheries, marine safety, and maritime operations.
          </p>

          {/* Hero Interactive Prompt Box */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroPromptSubmit}
              className="p-2 rounded-2xl bg-[#081C24]/90 border border-[#24404A] hover:border-[#39D6D0]/50 shadow-2xl flex items-center space-x-2 transition-all"
            >
              <div className="pl-3 text-[#39D6D0]">
                <Sparkles className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={heroPromptInput}
                onChange={(e) => setHeroPromptInput(e.target.value)}
                placeholder="Ask Pelora AI... (e.g. Is it safe to fish tomorrow morning?)"
                className="flex-1 bg-transparent border-none text-sm text-[#EAF6F7] placeholder-[#9BB3B8]/60 focus:outline-none font-manrope"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-bold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-md flex-shrink-0"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-3 flex items-center justify-center space-x-3 text-xs text-[#9BB3B8] font-data-label">
              <span>Try:</span>
              <button
                onClick={() => {
                  setHeroPromptInput("Find nearest high-potential PFZ zone");
                  runAIQuery("Find nearest high-potential PFZ zone");
                  setActivePage('ask');
                }}
                className="text-[#39D6D0] hover:underline"
              >
                "Find nearest PFZ zone"
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setHeroPromptInput("Plan safest route from Ratnagiri Jetty");
                  runAIQuery("Plan safest route from Ratnagiri Jetty");
                  setActivePage('ask');
                }}
                className="text-[#39D6D0] hover:underline"
              >
                "Plan safest route"
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('map')}
              className="px-6 py-3.5 rounded-xl bg-[#0B2630] border border-[#39D6D0]/40 text-[#EAF6F7] font-bold text-sm font-manrope hover:bg-[#0E4350] hover:border-[#39D6D0] transition-all flex items-center space-x-2 shadow-lg"
            >
              <MapIcon className="w-4 h-4 text-[#39D6D0]" />
              <span>Explore Live Ocean Map</span>
            </button>
            <button
              onClick={() => setActivePage('ask')}
              className="px-6 py-3.5 rounded-xl bg-[#081C24] border border-[#24404A] text-[#9BB3B8] hover:text-[#EAF6F7] hover:border-[#39D6D0]/40 font-bold text-sm font-manrope transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#39D6D0]" />
              <span>Ask AI Workspace</span>
            </button>
            <button
              onClick={() => setActivePage('auth')}
              className="px-6 py-3.5 rounded-xl bg-[#081C24] border border-[#24404A] text-[#9BB3B8] hover:text-[#EAF6F7] hover:border-[#75E6B5]/40 font-bold text-sm font-manrope transition-all flex items-center space-x-2"
            >
              <User className="w-4 h-4 text-[#75E6B5]" />
              <span>Sign In / Onboarding</span>
            </button>
          </div>
        </section>

        {/* SECTION 2: LIVE OCEAN MAP CANVAS */}
        <section id="canvas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#39D6D0] font-data-label uppercase tracking-wider">
                OPERATIONAL COMMAND CANVAS
              </span>
              <h2 className="text-2xl font-bold font-manrope text-[#EAF6F7] mt-0.5">
                Live Marine Telemetry & Hydrographic Map
              </h2>
            </div>
            <FreshnessIndicator freshness="INCOIS Satellite Sync 14m ago" sourceCount={4} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 h-[520px]">
              <MapShell height="100%" showControls={true} />
            </div>

            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
              <SafetyScoreGauge
                score={84}
                title="Coastal Safety Index"
                subtitle="Ratnagiri South Sector • Next 12 hours"
              />

              <div className="grid grid-cols-2 gap-3">
                <MarineMetricCard
                  label="Sea Surface Temp"
                  value={liveObs.sst}
                  unit="°C"
                  change="Front +0.8°C"
                  status="neutral"
                  icon={Activity}
                  subtitle="INSAT-3DR"
                />
                <MarineMetricCard
                  label="Chlorophyll"
                  value={liveObs.chlorophyll}
                  unit="mg/m³"
                  change="Bloom Active"
                  status="safe"
                  icon={Waves}
                  subtitle="Oceansat-3"
                />
                <MarineMetricCard
                  label="Wave Height"
                  value={liveObs.waveHeight}
                  unit="m"
                  change="Period 6.2s"
                  status="safe"
                  icon={Anchor}
                  subtitle="Buoy AS-04"
                />
                <MarineMetricCard
                  label="Wind Speed"
                  value={liveObs.windSpeed}
                  unit="km/h"
                  change="SW Vector"
                  status="neutral"
                  icon={Compass}
                  subtitle="IMD Radar"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#081C24] border border-[#39D6D0]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-data-label text-[#39D6D0] uppercase tracking-wider">
                    TOP POTENTIAL FISHING ZONE
                  </span>
                  <ConfidenceBadge score={92} size="sm" />
                </div>
                <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">
                  {topPFZ.regionName} ({topPFZ.zoneCode})
                </h4>
                <div className="text-xs text-[#9BB3B8] space-y-1">
                  <p>Est. Catch: <strong className="text-[#75E6B5]">{topPFZ.expectedCatchKgPerTrip} kg/trip</strong></p>
                  <p>Best Window: <strong className="text-[#EAF6F7]">{topPFZ.bestWindow}</strong></p>
                </div>
                <button
                  onClick={() => setActivePage('map')}
                  className="w-full mt-2 py-2 bg-[#0B2630] hover:bg-[#0E4350] border border-[#39D6D0]/40 text-[#39D6D0] font-bold text-xs font-manrope rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Open Ocean Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MULTI-AGENT ARCHITECTURE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#081C24]/80 p-8 rounded-2xl border border-[#24404A]">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold text-[#39D6D0] font-data-label uppercase tracking-widest">
              REASONING ARCHITECTURE
            </span>
            <h2 className="text-3xl font-bold font-manrope text-[#EAF6F7]">
              Collaborative Multi-Agent Intelligence Engine
            </h2>
            <p className="text-sm text-[#9BB3B8] font-body leading-relaxed">
              Pelora does not rely on a generic single LLM. A network of specialized AI agents analyzes satellite feeds, hydrographic buoys, wind vectors, and safety constraints in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {[
                { name: 'Planner Agent', role: 'Decomposes complex query into satellite, weather & geospatial sub-tasks' },
                { name: 'Ocean Data Agent', role: 'Ingests ISRO Oceansat-3, INSAT-3DR SST & NIOT buoy observations' },
                { name: 'Weather & Risk Agent', role: 'Evaluates WaveWatch III forecasts, wind vectors & squall risks' },
                { name: 'Fishing Intelligence Agent', role: 'Ranks thermal fronts, chlorophyll blooms & expected catch yield' },
                { name: 'Verification Agent', role: 'Validates findings against official advisories & computes confidence score' },
              ].map((agent, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#06131A] border border-[#24404A] hover:border-[#39D6D0]/40 transition-colors flex items-start space-x-3"
                >
                  <div className="p-2 rounded-lg bg-[#081C24] text-[#39D6D0] border border-[#24404A]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-manrope text-[#EAF6F7]">{agent.name}</h4>
                    <p className="text-xs text-[#9BB3B8] mt-0.5">{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {telemetryRun && <AgentTimeline telemetry={telemetryRun} />}
            </div>
          </div>
        </section>

        {/* SECTION 4: SCENARIO SIMULATOR */}
        <section id="scenarios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#75E6B5] font-data-label uppercase tracking-wider">
              INTERACTIVE CAPABILITY SIMULATOR
            </span>
            <h2 className="text-3xl font-bold font-manrope text-[#EAF6F7]">
              Test Pelora Operational Scenarios
            </h2>
          </div>

          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setActiveScenario('fishing')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs font-manrope transition-all flex items-center space-x-2 border ${
                activeScenario === 'fishing'
                  ? 'bg-[#39D6D0] text-[#06131A] border-[#39D6D0]'
                  : 'bg-[#081C24] text-[#9BB3B8] border-[#24404A] hover:text-[#EAF6F7]'
              }`}
            >
              <Fish className="w-4 h-4" />
              <span>Scenario A: PFZ Catch Optimization</span>
            </button>
            <button
              onClick={() => setActiveScenario('safety')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs font-manrope transition-all flex items-center space-x-2 border ${
                activeScenario === 'safety'
                  ? 'bg-[#F18A63] text-[#06131A] border-[#F18A63]'
                  : 'bg-[#081C24] text-[#9BB3B8] border-[#24404A] hover:text-[#EAF6F7]'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Scenario B: Cyclone Warning & Rerouting</span>
            </button>
            <button
              onClick={() => setActiveScenario('ecosystem')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs font-manrope transition-all flex items-center space-x-2 border ${
                activeScenario === 'ecosystem'
                  ? 'bg-[#75E6B5] text-[#06131A] border-[#75E6B5]'
                  : 'bg-[#081C24] text-[#9BB3B8] border-[#24404A] hover:text-[#EAF6F7]'
              }`}
            >
              <Waves className="w-4 h-4" />
              <span>Scenario C: Ocean Health Anomaly</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4">
            {activeScenario === 'fishing' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#39D6D0] font-data-label uppercase">PROBLEM</span>
                  <h4 className="text-lg font-bold font-manrope text-[#EAF6F7]">Locating Harvest Zones in Arabian Sea</h4>
                  <p className="text-xs text-[#9BB3B8] leading-relaxed">
                    Traditional fishing relies on manual heuristics, wasting fuel and risking poor yields during thermal front shifts.
                  </p>
                </div>
                <div className="space-y-2 bg-[#06131A] p-4 rounded-xl border border-[#24404A]">
                  <span className="text-xs font-bold text-[#75E6B5] font-data-label uppercase">PELORA SYNTHESIS</span>
                  <p className="text-xs text-[#EAF6F7] font-semibold">
                    Detected 0.8°C SST convergence zone at 16.15°N with 2.10 mg/m³ chlorophyll bloom.
                  </p>
                  <div className="text-[11px] text-[#75E6B5] font-data-label">
                    Confidence: 94% • Est Yield: +350kg
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setActivePage('map')}
                    className="px-5 py-3 bg-[#39D6D0] text-[#06131A] font-bold text-xs font-manrope rounded-xl hover:brightness-110 transition-all inline-flex items-center space-x-2"
                  >
                    <span>Launch Platform Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeScenario === 'safety' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#F18A63] font-data-label uppercase">PROBLEM</span>
                  <h4 className="text-lg font-bold font-manrope text-[#EAF6F7]">Sudden Squall Line & High Wave Hazard</h4>
                  <p className="text-xs text-[#9BB3B8] leading-relaxed">
                    Frontal wind acceleration past 15:30 IST exposes coastal craft to 1.8m wave surge.
                  </p>
                </div>
                <div className="space-y-2 bg-[#06131A] p-4 rounded-xl border border-[#24404A]">
                  <span className="text-xs font-bold text-[#F4C95D] font-data-label uppercase">PELORA RECOMMENDATION</span>
                  <p className="text-xs text-[#EAF6F7] font-semibold">
                    Depart before 06:30 AM IST. Execute return transit via South Corridor before 14:00 IST.
                  </p>
                  <div className="text-[11px] text-[#F18A63] font-data-label">
                    Safety Risk: Avoided • 28 Vessels Notified
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setActivePage('map')}
                    className="px-5 py-3 bg-[#F18A63] text-[#06131A] font-bold text-xs font-manrope rounded-xl hover:brightness-110 transition-all inline-flex items-center space-x-2"
                  >
                    <span>Launch Safety Platform</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeScenario === 'ecosystem' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#75E6B5] font-data-label uppercase">PROBLEM</span>
                  <h4 className="text-lg font-bold font-manrope text-[#EAF6F7]">Marine Heatwave & Algal Bloom Surveillance</h4>
                  <p className="text-xs text-[#9BB3B8] leading-relaxed">
                    Monitoring thermal stress anomalies and dissolved oxygen drops in marine protected areas.
                  </p>
                </div>
                <div className="space-y-2 bg-[#06131A] p-4 rounded-xl border border-[#24404A]">
                  <span className="text-xs font-bold text-[#39D6D0] font-data-label uppercase">PELORA SYNTHESIS</span>
                  <p className="text-xs text-[#EAF6F7] font-semibold">
                    Thermal stress index +1.2°C above 10-year baseline. Moderate bloom detected.
                  </p>
                  <div className="text-[11px] text-[#75E6B5] font-data-label">
                    Ecosystem Index: 78/100 • Monitored Daily
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setActivePage('map')}
                    className="px-5 py-3 bg-[#75E6B5] text-[#06131A] font-bold text-xs font-manrope rounded-xl hover:brightness-110 transition-all inline-flex items-center space-x-2"
                  >
                    <span>Launch Ecosystem Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: EVIDENCE FEEDS */}
        <section id="evidence" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#39D6D0] font-data-label uppercase tracking-wider">
                DATA PROVENANCE & LINEAGE
              </span>
              <h2 className="text-2xl font-bold font-manrope text-[#EAF6F7] mt-0.5">
                Verified Scientific Data Feeds
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {evidenceList.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} />
            ))}
          </div>
        </section>

        {/* SECTION 6: CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-[#0E4350] via-[#0B2630] to-[#081C24] border border-[#39D6D0]/40 text-center space-y-5 relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#39D6D0]/10 border border-[#39D6D0]/30 text-xs font-data-label text-[#39D6D0]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Ready for Operational Prototyping</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#EAF6F7] max-w-2xl mx-auto">
              Experience the Next Generation of Marine Intelligence
            </h2>
            <div className="flex items-center justify-center space-x-4 pt-2">
              <button
                onClick={() => setActivePage('map')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-bold text-sm font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-2 shadow-xl"
              >
                <span>Enter Pelora Platform Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Public Footer */}
      <footer className="border-t border-[#24404A] bg-[#081C24]/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-[#9BB3B8] font-data-label">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#EAF6F7]">PELORA ORCA Platform</span>
            <span>•</span>
            <span>Marine Geospatial Multi-Agent AI</span>
          </div>
          <div>
            Data Sources: ISRO Oceansat-3, INSAT-3DR, NIOT Moored Buoy Network, INCOIS Advisory, WaveWatch III
          </div>
        </div>
      </footer>
    </div>
  );
};
