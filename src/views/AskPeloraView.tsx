import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { MarineDataService } from '@/services/marineDataService';
import {
  Sparkles,
  Send,
  Bot,
  BrainCircuit,
  ShieldCheck,
  Compass,
  MapPin,
  RefreshCw,
  Sliders,
  FileText,
  Navigation,
  Fish,
  Activity,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';
import { AgentTimeline } from '@/components/agents/AgentTimeline';
import { EvidenceCard } from '@/components/evidence/EvidenceCard';

const DEMO_PROMPTS = [
  "Is it safe to fish offshore Ratnagiri tomorrow morning?",
  "Locate the highest potential PFZ zone within 25 nautical miles.",
  "Calculate optimal fuel-efficient route from Ratnagiri Jetty to Zone PFZ-AR-09.",
  "Analyze cause of chlorophyll bloom spike near Malvan thermal front.",
  "Check restricted international boundary proximity for current vessel course."
];

export const AskPeloraView: React.FC = () => {
  const { setActivePage, activeQuery, runAIQuery, telemetryRun, isSimulatingAgent } = usePeloraStore();

  const [queryInput, setQueryInput] = useState(activeQuery);
  const [selectedRegion, setSelectedRegion] = useState('Arabian Sea (Ratnagiri)');
  const [selectedVesselType, setSelectedVesselType] = useState('Deep-Sea Trawler (18m)');
  const [forecastHorizon, setForecastHorizon] = useState('24 Hours');
  const [priority, setPriority] = useState('Balanced (Safety + Yield)');

  const evidenceList = MarineDataService.getEvidenceSources();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    runAIQuery(queryInput);
  };

  const handleSelectPreset = (promptText: string) => {
    setQueryInput(promptText);
    runAIQuery(promptText);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#39D6D0] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MULTI-AGENT REASONING WORKSPACE</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Ask Pelora — Marine AI Decision Engine
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Formulate complex natural-language queries to execute real-time multi-agent satellite & oceanographic synthesis.
          </p>
        </div>

        <FreshnessIndicator freshness="ISRO & INCOIS Feed Active" sourceCount={4} />
      </div>

      {/* Main Grid: Query Composer (7 Cols) + Context Controls (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Natural Language Composer & Outputs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Query Composer Card */}
          <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] shadow-xl space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#EAF6F7] font-manrope flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-[#39D6D0]" />
                  <span>Enter Natural Language Query</span>
                </label>
                <span className="text-[11px] text-[#9BB3B8] font-mono-code">AI Agent Telemetry: Online</span>
              </div>

              <div className="relative">
                <textarea
                  rows={3}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="e.g. Is it safe to fish offshore Ratnagiri tomorrow morning? What is the expected catch yield?"
                  className="w-full bg-[#06131A] border border-[#24404A] focus:border-[#39D6D0] rounded-xl p-4 text-sm text-[#EAF6F7] placeholder-[#9BB3B8]/60 focus:outline-none transition-colors font-manrope resize-none"
                />
                <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                  <button
                    type="submit"
                    disabled={isSimulatingAgent}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-extrabold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-2 shadow-md disabled:opacity-50"
                  >
                    {isSimulatingAgent ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Executing Agents...</span>
                      </>
                    ) : (
                      <>
                        <span>Execute Multi-Agent Synthesis</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Prompt Shortcuts */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-data-label text-[#9BB3B8] font-semibold">
                  Recommended Operational Prompts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {DEMO_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(prompt)}
                      className="text-left text-[11px] px-3 py-1.5 rounded-lg bg-[#0B2630] border border-[#24404A] text-[#9BB3B8] hover:text-[#39D6D0] hover:border-[#39D6D0]/40 transition-colors font-manrope"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* AI Result & Synthesis Panel */}
          {isSimulatingAgent && (
            <div className="space-y-6 animate-pulse">
              <div className="p-6 rounded-2xl bg-[#0B2630]/50 border border-[#24404A] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#24404A] pb-4">
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-[#24404A] rounded-full"></div>
                    <div className="h-6 w-64 bg-[#24404A] rounded-full"></div>
                  </div>
                  <div className="h-10 w-24 bg-[#24404A] rounded-full"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 w-full bg-[#24404A] rounded-full"></div>
                  <div className="h-4 w-5/6 bg-[#24404A] rounded-full"></div>
                  <div className="h-4 w-4/6 bg-[#24404A] rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#06131A] border border-[#24404A] space-y-2">
                      <div className="h-3 w-16 bg-[#24404A] rounded-full"></div>
                      <div className="h-5 w-20 bg-[#24404A] rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isSimulatingAgent && telemetryRun && (
            <div className="space-y-6 animate-fadeIn">
              {/* Synthesized Answer Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B2630] to-[#081C24] border border-[#39D6D0]/40 shadow-2xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#24404A] pb-4">
                  <div>
                    <span className="text-[10px] font-bold font-data-label uppercase tracking-widest text-[#39D6D0]">
                      SYNTHESIZED DECISION BRIEF
                    </span>
                    <h3 className="text-xl font-bold font-manrope text-[#EAF6F7] mt-0.5">
                      {telemetryRun.title || 'Favourable Departure Window Confirmed (05:30 – 11:30 IST)'}
                    </h3>
                  </div>
                  <ConfidenceBadge score={telemetryRun.overallConfidence || 94} size="lg" />
                </div>

                <div className="prose prose-invert text-xs text-[#EAF6F7]/90 leading-relaxed font-manrope space-y-3">
                  <p>
                    <strong>Executive Summary:</strong> {telemetryRun.summary || 'The multi-agent intelligence network has cross-validated satellite thermal imagery, ISRO chlorophyll forecasts, and INCOIS buoy telemetry.'}
                  </p>
                  
                  {/* Chatbot Conversational Response */}
                  {telemetryRun.chatResponse && (
                    <div className="bg-[#39D6D0]/10 border-l-2 border-[#39D6D0] p-4 rounded-r-xl mt-4 mb-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-[#39D6D0] flex items-center justify-center flex-shrink-0">
                          <BrainCircuit className="w-3 h-3 text-[#06131A]" />
                        </div>
                        <span className="text-xs font-bold text-[#39D6D0] font-data-label uppercase">Pelora AI Assistant</span>
                      </div>
                      <p className="text-sm text-[#EAF6F7] leading-relaxed">
                        {telemetryRun.chatResponse}
                      </p>
                    </div>
                  )}

                  {telemetryRun.steps && telemetryRun.steps.length > 0 && (
                    <div className="bg-[#06131A] p-3 rounded-xl border border-[#24404A] space-y-1 mt-2">
                      <span className="text-[10px] font-bold font-data-label text-[#39D6D0] uppercase">Verification Agent Synthesis:</span>
                      <p className="text-xs text-[#EAF6F7]">
                        {telemetryRun.steps[telemetryRun.steps.length - 1].outputSnippet}
                      </p>
                    </div>
                  )}
                </div>

                {/* Quantitative Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Safety Score</span>
                    <span className={`text-base font-extrabold font-manrope ${(telemetryRun.safetyScore ?? 84) < 60 ? 'text-[#F18A63]' : 'text-[#75E6B5]'}`}>
                      {telemetryRun.safetyScore ?? 84} / 100 {(telemetryRun.safetyScore ?? 84) < 60 ? 'Hazard' : 'Safe'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Target PFZ Yield</span>
                    <span className="text-base font-extrabold text-[#39D6D0] font-manrope">
                      {telemetryRun.yieldScore ?? 92} / 100 High
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Max Wave Height</span>
                    <span className="text-base font-extrabold text-[#EAF6F7] font-manrope">
                      {telemetryRun.maxWaveMeters ?? 0.9} m
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Wind Velocity</span>
                    <span className="text-base font-extrabold text-[#F4C95D] font-manrope">
                      {telemetryRun.windSpeedKnots ? `${telemetryRun.windSpeedKnots} kts` : '14.5 kts'}
                    </span>
                  </div>
                </div>

                {/* Actions & Next Steps */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#24404A]">
                  <div className="flex items-center space-x-2 text-xs font-data-label text-[#9BB3B8]">
                    <Clock className="w-3.5 h-3.5 text-[#39D6D0]" />
                    <span>Generated in {telemetryRun.totalDurationMs}ms</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setActivePage('map')}
                      className="px-4 py-2 bg-[#39D6D0] text-[#06131A] font-bold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-1.5"
                    >
                      <span>Inspect on Ocean Map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActivePage('fishing')}
                      className="px-4 py-2 bg-[#0B2630] border border-[#24404A] text-[#39D6D0] hover:border-[#39D6D0]/40 font-bold text-xs font-manrope rounded-xl transition-all flex items-center space-x-1.5"
                    >
                      <Fish className="w-3.5 h-3.5" />
                      <span>View PFZ Zone</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Multi-Agent Execution Telemetry Log */}
              <AgentTimeline telemetry={telemetryRun} />
            </div>
          )}
        </div>

        {/* Right Column: Parameters & Evidence Feeds (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Query Parameters Filter Card */}
          <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4">
            <h3 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider flex items-center space-x-2 border-b border-[#24404A] pb-3">
              <Sliders className="w-4 h-4 text-[#39D6D0]" />
              <span>Query Context & Filters</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-[#9BB3B8] font-data-label font-medium mb-1">
                  Target Sector / Coastline
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-[#06131A] border border-[#24404A] rounded-xl px-3 py-2 text-xs text-[#EAF6F7] focus:outline-none font-manrope"
                >
                  <option>Arabian Sea (Ratnagiri South)</option>
                  <option>Bay of Bengal (Visakhapatnam)</option>
                  <option>Lakshadweep Offshore Sector</option>
                  <option>Goa Coastal Grid</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#9BB3B8] font-data-label font-medium mb-1">
                  Vessel Class / Craft Type
                </label>
                <select
                  value={selectedVesselType}
                  onChange={(e) => setSelectedVesselType(e.target.value)}
                  className="w-full bg-[#06131A] border border-[#24404A] rounded-xl px-3 py-2 text-xs text-[#EAF6F7] focus:outline-none font-manrope"
                >
                  <option>Deep-Sea Trawler (18m)</option>
                  <option>Motorized Gillnetter (12m)</option>
                  <option>Artisanal Traditional Canoe</option>
                  <option>Coastal Patrol Craft</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#9BB3B8] font-data-label font-medium mb-1">
                  Forecast Horizon
                </label>
                <select
                  value={forecastHorizon}
                  onChange={(e) => setForecastHorizon(e.target.value)}
                  className="w-full bg-[#06131A] border border-[#24404A] rounded-xl px-3 py-2 text-xs text-[#EAF6F7] focus:outline-none font-manrope"
                >
                  <option>Next 12 Hours</option>
                  <option>Next 24 Hours</option>
                  <option>Next 48 Hours</option>
                  <option>7-Day Outlook</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#9BB3B8] font-data-label font-medium mb-1">
                  Optimization Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[#06131A] border border-[#24404A] rounded-xl px-3 py-2 text-xs text-[#EAF6F7] focus:outline-none font-manrope"
                >
                  <option>Balanced (Safety + Yield)</option>
                  <option>Strict Safety Priority</option>
                  <option>Maximum Fish Yield</option>
                  <option>Minimum Fuel Consumption</option>
                </select>
              </div>
            </div>
          </div>

          {/* Evidence Data Lineage Panel */}
          <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4">
            <h3 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider flex items-center space-x-2 border-b border-[#24404A] pb-3">
              <ShieldCheck className="w-4 h-4 text-[#75E6B5]" />
              <span>Validated Evidence Lineage</span>
            </h3>

            <div className="space-y-3">
              {evidenceList.slice(0, 3).map((ev) => (
                <EvidenceCard key={ev.id} evidence={ev} />
              ))}
            </div>

            <button
              onClick={() => setActivePage('data')}
              className="w-full py-2 bg-[#0B2630] border border-[#24404A] hover:border-[#39D6D0]/40 text-[#39D6D0] text-xs font-bold font-manrope rounded-xl transition-colors text-center block"
            >
              Inspect Data Provenance Graph →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
