import React from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { Waves, ShieldAlert, Activity, Heart, AlertCircle, CheckCircle2, MapPin, Eye, Compass } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const EcosystemView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#75E6B5] mb-1">
            <Waves className="w-3.5 h-3.5" />
            <span>ECOSYSTEM & MARINE HEALTH SURVEILLANCE</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Ocean Biological Health & Sanctuary Monitoring
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Real-time monitoring of coral reef thermal stress, algal blooms, dissolved oxygen levels, and MPA boundaries.
          </p>
        </div>

        <FreshnessIndicator freshness="NOAA & CMFRI Ecosystem Feed Active" sourceCount={4} />
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-2">
          <span className="text-[10px] font-bold font-data-label text-[#9BB3B8] uppercase">Coral Stress Index</span>
          <h3 className="text-2xl font-extrabold font-manrope text-[#75E6B5]">0.4 DHW (Low Risk)</h3>
          <span className="text-xs text-[#75E6B5] font-data-label">Below bleaching alert threshold</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-2">
          <span className="text-[10px] font-bold font-data-label text-[#9BB3B8] uppercase">Dissolved Oxygen</span>
          <h3 className="text-2xl font-extrabold font-manrope text-[#39D6D0]">6.2 mg/L</h3>
          <span className="text-xs text-[#39D6D0] font-data-label">Optimal pelagic respiration</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-2">
          <span className="text-[10px] font-bold font-data-label text-[#9BB3B8] uppercase">MPA Sanctuary Compliance</span>
          <h3 className="text-2xl font-extrabold font-manrope text-[#75E6B5]">100% Protected</h3>
          <span className="text-xs text-[#75E6B5] font-data-label">No illegal trawling incursions</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Coral & HAB Health (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4 shadow-xl">
            <h3 className="text-base font-bold font-manrope text-[#EAF6F7] border-b border-[#24404A] pb-3">
              Marine Sanctuary Health Indicators
            </h3>

            <div className="space-y-4">
              {[
                { name: 'Angria Bank Coral Reef Ecosystem', status: 'Healthy', temp: '27.4°C', risk: 'Low', score: 92 },
                { name: 'Malvan Marine Sanctuary Protected Zone', status: 'Stable', temp: '27.1°C', risk: 'Low', score: 88 },
                { name: 'Netrani Island Sanctuary Sector', status: 'Moderate Stress', temp: '28.2°C', risk: 'Caution', score: 74 },
              ].map((site, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#06131A] border border-[#24404A] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">{site.name}</h4>
                    <ConfidenceBadge score={site.score} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-data-label text-[#9BB3B8]">
                    <span>Status: <strong className="text-[#75E6B5]">{site.status}</strong></span>
                    <span>Temp: <strong className="text-[#EAF6F7]">{site.temp}</strong></span>
                    <span>Bleaching Risk: <strong className="text-[#39D6D0]">{site.risk}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Harmful Algal Bloom Tracking (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider border-b border-[#24404A] pb-3">
              Algal Bloom & Toxicity Radar
            </h3>

            <div className="p-4 rounded-xl bg-[#06131A] border border-[#24404A] space-y-2">
              <span className="text-[10px] font-bold font-data-label text-[#75E6B5] uppercase">NOAA SENTINEL SYNTHESIS</span>
              <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">No Harmful Algal Blooms (HAB) Active</h4>
              <p className="text-xs text-[#9BB3B8]">
                Chlorophyll concentrations in the Ratnagiri sector are dominated by non-toxic diatom species (*Chaetoceros* & *Skeletonema*).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
