import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { Sparkles, X, Send, Bot, ShieldCheck, ArrowRight, Activity, MapPin, RefreshCw } from 'lucide-react';
import { AgentTimeline } from '../agents/AgentTimeline';
import { ConfidenceBadge } from '../ui/ConfidenceBadge';
import { FreshnessIndicator } from '../ui/FreshnessIndicator';

const PRESET_QUERIES = [
  "Is it safe to fish offshore Ratnagiri tomorrow morning?",
  "Find the nearest high-yield Potential Fishing Zone (PFZ).",
  "Plan the safest route from Ratnagiri Jetty avoiding squalls.",
  "Explain why chlorophyll concentration spiked near Malvan Front.",
  "Check restricted boundary proximity for current vessel track."
];

export const AskPeloraModal: React.FC = () => {
  const {
    isAskModalOpen,
    toggleAskModal,
    activeQuery,
    runAIQuery,
    telemetryRun,
    isSimulatingAgent,
    setActivePage,
  } = usePeloraStore();

  const [inputQuery, setInputQuery] = useState(activeQuery);

  if (!isAskModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    runAIQuery(inputQuery);
  };

  const handleSelectPreset = (preset: string) => {
    setInputQuery(preset);
    runAIQuery(preset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06131A]/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#081C24] border border-[#24404A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#24404A] flex items-center justify-between bg-[#0B2630]/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#39D6D0] to-[#116579] text-[#06131A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-manrope text-[#EAF6F7]">
                Pelora Intelligence Command & Search
              </h3>
              <p className="text-xs text-[#9BB3B8] font-data-label">
                Cross-reference hydrographic, satellite & AIS telemetry across 11 live ocean parameters
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleAskModal(false)}
            className="p-1.5 rounded-lg text-[#9BB3B8] hover:text-[#EAF6F7] hover:bg-[#06131A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Query Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Query ocean conditions, safety indices, PFZ boundaries, or optimal routing..."
                className="w-full bg-[#06131A] border border-[#24404A] focus:border-[#39D6D0] rounded-xl px-4 py-3 text-sm text-[#EAF6F7] placeholder-[#9BB3B8]/60 focus:outline-none transition-colors pr-28 font-manrope shadow-inner"
              />
              <button
                type="submit"
                disabled={isSimulatingAgent}
                className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-bold text-xs font-manrope rounded-lg hover:brightness-110 transition-all flex items-center space-x-1.5 disabled:opacity-50"
              >
                {isSimulatingAgent ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Search</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[#9BB3B8] font-data-label flex-shrink-0 text-[11px]">
                Quick Queries:
              </span>
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="px-2.5 py-1 rounded-full bg-[#0B2630] border border-[#24404A] text-[#9BB3B8] hover:text-[#39D6D0] hover:border-[#39D6D0]/40 transition-colors whitespace-nowrap text-[11px]"
                >
                  {preset}
                </button>
              ))}
            </div>
          </form>

          {/* AI Result Card */}
          {telemetryRun && !isSimulatingAgent && (
            <div className="space-y-5 animate-fadeIn">
              {/* Structured AI Recommendation Output */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#0B2630] to-[#081C24] border border-[#39D6D0]/40 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold font-data-label uppercase tracking-widest text-[#39D6D0]">
                      HYDROGRAPHIC DECISION BRIEF
                    </span>
                    <h4 className="text-lg font-bold font-manrope text-[#EAF6F7] mt-1">
                      Favourable Departure Window Confirmed before 11:30 AM IST
                    </h4>
                  </div>
                  <ConfidenceBadge score={94} size="md" />
                </div>

                <p className="text-xs text-[#EAF6F7]/90 leading-relaxed font-manrope">
                  Satellite thermal imagery and INCOIS buoy AS-04 telemetry indicate low wave heights (0.9m) and high chlorophyll density (1.82 mg/m³) offshore Ratnagiri. Squall line formation is predicted post-15:30 IST. Harvesting in zone <strong>PFZ-AR-09</strong> is strongly recommended for peak yield.
                </p>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-2.5 rounded-lg bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label">Safety Index</span>
                    <span className="text-sm font-bold text-[#75E6B5] font-manrope">84 / 100 Safe</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label">PFZ Potential</span>
                    <span className="text-sm font-bold text-[#39D6D0] font-manrope">92 / 100 High</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label">Sea Surface Temp</span>
                    <span className="text-sm font-bold text-[#EAF6F7] font-manrope">27.4°C Front</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#06131A] border border-[#24404A]">
                    <span className="text-[10px] text-[#9BB3B8] block font-data-label">Max Wave Height</span>
                    <span className="text-sm font-bold text-[#EAF6F7] font-manrope">0.9 m Calm</span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center justify-between border-t border-[#24404A]">
                  <FreshnessIndicator freshness="INCOIS Oceansat-3 Sync 14m ago" sourceCount={4} />
                  <button
                    onClick={() => {
                      toggleAskModal(false);
                      setActivePage('fishing');
                    }}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-[#39D6D0] hover:text-[#6AE7E2] transition-colors"
                  >
                    <span>Explore PFZ Map View</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Multi-Agent Telemetry Timeline */}
              <AgentTimeline telemetry={telemetryRun} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
