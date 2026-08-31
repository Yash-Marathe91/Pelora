import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { MarineDataService } from '@/services/marineDataService';
import { PFZZone } from '@/types/pelora';
import { Fish, MapPin, Sparkles, Navigation, Activity, Waves, Clock, TrendingUp, ShieldCheck, ArrowRight, Filter, ChevronRight, BarChart2, Compass } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const FishingView: React.FC = () => {
  const { setActivePage, setActivePFZ, runAIQuery } = usePeloraStore();
  const pfzZones = MarineDataService.getTopPFZones();
  const [selectedZone, setSelectedZone] = useState<PFZZone>(pfzZones[0]);
  const [filterSpecies, setFilterSpecies] = useState<string>('all');

  const filteredZones = pfzZones.filter((z) => {
    if (filterSpecies === 'all') return true;
    return z.dominantSpecies.some((s) => s.toLowerCase().includes(filterSpecies.toLowerCase()));
  });

  const handleAskAIAboutPFZ = (zone: PFZZone) => {
    const prompt = `Provide detailed fishing intelligence, yield breakdown, and optimal arrival window for Zone ${zone.zoneCode} (${zone.regionName}).`;
    runAIQuery(prompt);
    setActivePage('ask');
  };

  const handlePlanRouteToPFZ = (zone: PFZZone) => {
    setActivePFZ(zone);
    setActivePage('routes');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#75E6B5] mb-1">
            <Fish className="w-3.5 h-3.5" />
            <span>FISHING INTELLIGENCE & PFZ EXPLORER</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Potential Fishing Zones (PFZ) & Catch Analytics
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            INCOIS satellite thermal gradient & chlorophyll convergence model for maximum sustainable yield.
          </p>
        </div>

        <FreshnessIndicator freshness="INCOIS PFZ Feed Updated 14m ago" sourceCount={4} />
      </div>

      {/* Main Grid: Zone List (5 Cols) + Selected Zone Deep Dive (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: PFZ Cards List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Filters Bar */}
          <div className="p-3.5 rounded-xl bg-[#081C24] border border-[#24404A] flex items-center justify-between text-xs font-data-label">
            <span className="text-[#9BB3B8] font-semibold flex items-center space-x-1.5">
              <Filter className="w-3.5 h-3.5 text-[#39D6D0]" />
              <span>Filter Species:</span>
            </span>
            <select
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="bg-[#06131A] border border-[#24404A] rounded-lg px-2.5 py-1 text-xs text-[#EAF6F7] focus:outline-none font-manrope"
            >
              <option value="all">All Species</option>
              <option value="mackerel">Indian Mackerel</option>
              <option value="sardine">Oil Sardine</option>
              <option value="tuna">Skipjack Tuna</option>
              <option value="pomfret">Silver Pomfret</option>
            </select>
          </div>

          {/* Zones List */}
          <div className="space-y-3">
            {filteredZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-[#0B2630] border-[#39D6D0] shadow-lg ring-1 ring-[#39D6D0]/50'
                      : 'bg-[#081C24] border-[#24404A] hover:border-[#39D6D0]/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold font-data-label uppercase tracking-widest text-[#39D6D0]">
                        {zone.zoneCode}
                      </span>
                      <h4 className="text-base font-bold font-manrope text-[#EAF6F7] mt-0.5">
                        {zone.regionName}
                      </h4>
                    </div>
                    <ConfidenceBadge score={zone.potentialScore} size="sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-manrope text-[#9BB3B8] pt-1">
                    <div>
                      <span>Est. Catch Yield:</span>
                      <strong className="text-[#75E6B5] block font-bold text-sm">
                        {zone.expectedCatchKgPerTrip} kg / trip
                      </strong>
                    </div>
                    <div>
                      <span>Distance:</span>
                      <strong className="text-[#EAF6F7] block font-bold text-sm">
                        {zone.distanceFromShoreKm} km offshore
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#9BB3B8] font-data-label pt-2 border-t border-[#24404A]/60">
                    <span className="text-[#39D6D0] font-medium">{zone.bestWindow}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#39D6D0] translate-x-1' : 'text-[#9BB3B8]'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected PFZ Analytics Deep Dive */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Inspection Card */}
          <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#24404A] pb-4">
              <div>
                <span className="text-xs font-bold font-data-label text-[#75E6B5] uppercase tracking-widest">
                  DETAILED ZONE ANALYSIS • {selectedZone.zoneCode}
                </span>
                <h3 className="text-2xl font-extrabold font-manrope text-[#EAF6F7] mt-0.5">
                  {selectedZone.regionName}
                </h3>
                <span className="text-xs text-[#9BB3B8] font-mono-code">
                  Center: {selectedZone.centerCoordinates[1]}°N, {selectedZone.centerCoordinates[0]}°E
                </span>
              </div>
              <ConfidenceBadge score={selectedZone.potentialScore} size="lg" />
            </div>

            {/* Score Breakdown Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#06131A] border border-[#24404A]">
                <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Biological Score</span>
                <span className="text-xl font-extrabold text-[#75E6B5] font-manrope">
                  {selectedZone.biologicalScore} / 100
                </span>
                <span className="text-[10px] text-[#9BB3B8] block mt-0.5">Chlorophyll bloom convergence</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#06131A] border border-[#24404A]">
                <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Operational Score</span>
                <span className="text-xl font-extrabold text-[#39D6D0] font-manrope">
                  {selectedZone.operationalScore} / 100
                </span>
                <span className="text-[10px] text-[#9BB3B8] block mt-0.5">Wave & weather transit ease</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#06131A] border border-[#24404A]">
                <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Safety Status</span>
                <span className="text-xl font-extrabold text-[#75E6B5] font-manrope uppercase">
                  {selectedZone.safetyStatus}
                </span>
                <span className="text-[10px] text-[#9BB3B8] block mt-0.5">Below 1.2m wave threshold</span>
              </div>
            </div>

            {/* Biophysical Indicator Metrics */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider">
                Satellite Biophysical Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#06131A] border border-[#24404A] flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-[#39D6D0]/10 text-[#39D6D0]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#9BB3B8] block font-data-label">Thermal Front Gradient</span>
                    <strong className="text-sm font-bold text-[#EAF6F7] font-manrope">{selectedZone.sstGradient}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#06131A] border border-[#24404A] flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-[#75E6B5]/10 text-[#75E6B5]">
                    <Waves className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#9BB3B8] block font-data-label">Chlorophyll Bloom</span>
                    <strong className="text-sm font-bold text-[#EAF6F7] font-manrope">{selectedZone.chlorophyllBloom}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Species Pills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider">
                Dominant Fish Species Aggregation
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedZone.dominantSpecies.map((species, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#0B2630] border border-[#39D6D0]/40 text-xs font-bold text-[#39D6D0] font-manrope flex items-center space-x-1.5"
                  >
                    <Fish className="w-3.5 h-3.5" />
                    <span>{species}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Controls */}
            <div className="pt-4 border-t border-[#24404A] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#9BB3B8] font-data-label">
                Best Harvest Time: <strong className="text-[#EAF6F7] font-manrope">{selectedZone.bestWindow}</strong>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleAskAIAboutPFZ(selectedZone)}
                  className="px-4 py-2.5 bg-[#0B2630] border border-[#39D6D0]/40 text-[#39D6D0] hover:bg-[#0E4350] font-bold text-xs font-manrope rounded-xl transition-all flex items-center space-x-2"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Query Zone Analytics</span>
                </button>
                <button
                  onClick={() => handlePlanRouteToPFZ(selectedZone)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-extrabold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Plan Route to Zone</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
