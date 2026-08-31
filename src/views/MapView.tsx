import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { MarineDataService } from '@/services/marineDataService';
import { MapShell } from '@/components/maps/MapShell';
import { Layers, Fish, Navigation, ShieldAlert, Sparkles, Sliders, Activity, Clock, Compass, Waves, ArrowRight, Eye, RefreshCw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen, Minimize2, Maximize2 } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const MapView: React.FC = () => {
  const { setActivePage, activePFZ, setActivePFZ, activeVessel, setActiveVessel, lastDataSyncTime } = usePeloraStore();
  const [activeTab, setActiveTab] = useState<'layers' | 'inspector' | 'legend'>('layers');
  const [timeStep, setTimeStep] = useState(12); // Hours forecast

  // Collapsible state for floating windows
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
  const [isActionsCollapsed, setIsActionsCollapsed] = useState(false);

  const pfzList = MarineDataService.getTopPFZones();
  const vesselList = MarineDataService.getActiveVessels();
  const selectedPFZ = activePFZ || pfzList[0];

  return (
    <div className="h-[calc(100vh-6rem)] relative flex flex-col overflow-hidden rounded-2xl border border-[#24404A] bg-[#06131A]">
      {/* Top Floating Map Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none transition-all duration-300">
        {isHeaderCollapsed ? (
          <div className="pointer-events-auto flex items-center space-x-2 bg-[#081C24]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#24404A] shadow-xl text-xs font-manrope">
            <span className="w-2.5 h-2.5 rounded-full bg-[#75E6B5] animate-ping" />
            <span className="font-bold text-[#EAF6F7]">Operational Grid</span>
            <button
              onClick={() => setIsHeaderCollapsed(false)}
              className="p-1 hover:bg-[#0B2630] rounded text-[#39D6D0] transition-colors"
              title="Expand Toolbar"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            {/* Left Status & Sector Badge */}
            <div className="pointer-events-auto flex items-center space-x-3 bg-[#081C24]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#24404A] shadow-xl text-xs font-manrope">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#75E6B5] animate-ping" />
                <span className="font-bold text-[#EAF6F7]">Arabian Sea Operational Grid</span>
              </div>
              <span className="text-[#9BB3B8] font-mono-code text-[11px]">16.44°N, 72.82°E</span>
              <span className="text-[#24404A]">|</span>
              <FreshnessIndicator freshness={lastDataSyncTime} sourceCount={4} />
            </div>

            {/* Right Time Scrubber Bar */}
            <div className="pointer-events-auto flex items-center space-x-3 bg-[#081C24]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#24404A] shadow-xl text-xs">
              <Clock className="w-4 h-4 text-[#39D6D0]" />
              <span className="text-[#9BB3B8] font-data-label text-[11px]">Forecast Horizon:</span>
              <div className="flex items-center space-x-1">
                {[0, 6, 12, 24, 48].map((h) => (
                  <button
                    key={h}
                    onClick={() => setTimeStep(h)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono-code transition-colors ${
                      timeStep === h
                        ? 'bg-[#39D6D0] text-[#06131A] font-bold'
                        : 'bg-[#0B2630] text-[#9BB3B8] hover:text-[#EAF6F7]'
                    }`}
                  >
                    +{h}h
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsHeaderCollapsed(true)}
                className="p-1 hover:bg-[#0B2630] rounded text-[#9BB3B8] hover:text-[#EAF6F7] transition-colors ml-1"
                title="Collapse Toolbar"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Main Full-Screen Map Container */}
      <div className="flex-1 w-full h-full relative">
        <MapShell height="100%" showControls={false} />

        {/* Right Interactive Drawer Panel */}
        {isDrawerCollapsed ? (
          <button
            onClick={() => setIsDrawerCollapsed(false)}
            className="absolute top-16 right-4 z-20 px-3 py-2 bg-[#081C24]/95 backdrop-blur-md border border-[#24404A] hover:border-[#39D6D0] rounded-xl shadow-2xl flex items-center space-x-2 text-[#EAF6F7] text-xs font-bold font-manrope transition-all"
            title="Expand Side Drawer"
          >
            <PanelRightOpen className="w-4 h-4 text-[#39D6D0]" />
            <span>Inspector & Layers</span>
          </button>
        ) : (
          <div className="absolute top-16 bottom-16 right-4 z-20 w-80 bg-[#081C24]/95 backdrop-blur-md border border-[#24404A] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
            {/* Drawer Header Tabs & Collapse Button */}
            <div className="flex items-center border-b border-[#24404A] bg-[#06131A]">
              <div className="flex flex-1">
                {[
                  { id: 'layers', label: 'Layers', icon: Layers },
                  { id: 'inspector', label: 'Inspector', icon: Sliders },
                  { id: 'legend', label: 'Legend', icon: Activity },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-3 text-xs font-bold font-manrope flex items-center justify-center space-x-1.5 transition-colors border-b-2 ${
                        isSelected
                          ? 'text-[#39D6D0] border-[#39D6D0] bg-[#081C24]'
                          : 'text-[#9BB3B8] border-transparent hover:text-[#EAF6F7]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setIsDrawerCollapsed(true)}
                className="p-3 text-[#9BB3B8] hover:text-[#EAF6F7] hover:bg-[#081C24] transition-colors border-l border-[#24404A]"
                title="Collapse Drawer"
              >
                <PanelRightClose className="w-4 h-4 text-[#39D6D0]" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeTab === 'layers' && (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold font-data-label uppercase tracking-wider text-[#39D6D0]">
                    Satellite & Ocean Layers
                  </span>

                  {[
                    { name: 'SST Thermal Fronts (°C)', active: true, source: 'INSAT-3DR Satellite' },
                    { name: 'Chlorophyll Concentration', active: true, source: 'ISRO Oceansat-3' },
                    { name: 'PFZ Polygons & Score', active: true, source: 'INCOIS Advisor' },
                    { name: 'AIS Vessel Real-Time Tracks', active: true, source: 'DG-Shipping AIS' },
                    { name: 'Wave Height Vector Field', active: false, source: 'WaveWatch III' },
                    { name: 'Bathymetry Depths (m)', active: false, source: 'GEBCO Grid' },
                  ].map((layer, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#0B2630]/60 border border-[#24404A] flex items-center justify-between hover:border-[#39D6D0]/40 transition-colors"
                    >
                      <div>
                        <h4 className="text-xs font-bold font-manrope text-[#EAF6F7]">{layer.name}</h4>
                        <span className="text-[10px] text-[#9BB3B8] font-data-label">{layer.source}</span>
                      </div>
                      <button
                        className={`p-1.5 rounded-lg text-xs font-bold ${
                          layer.active
                            ? 'bg-[#39D6D0]/20 text-[#39D6D0] border border-[#39D6D0]/40'
                            : 'bg-[#06131A] text-[#9BB3B8]'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inspector' && (
                <div className="space-y-4">
                  <span className="text-[11px] font-bold font-data-label uppercase tracking-wider text-[#39D6D0]">
                    Selected Feature Details
                  </span>

                  {/* PFZ Detail */}
                  <div className="p-4 rounded-xl bg-[#0B2630] border border-[#39D6D0]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-data-label text-[#75E6B5] uppercase">PFZ ZONE</span>
                      <ConfidenceBadge score={selectedPFZ.potentialScore} size="sm" />
                    </div>
                    <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">
                      {selectedPFZ.regionName} ({selectedPFZ.zoneCode})
                    </h4>
                    <div className="text-xs space-y-1.5 text-[#9BB3B8] font-manrope">
                      <div className="flex justify-between">
                        <span>Catch Potential:</span>
                        <strong className="text-[#75E6B5]">{selectedPFZ.expectedCatchKgPerTrip} kg</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>SST Gradient:</span>
                        <strong className="text-[#EAF6F7]">{selectedPFZ.sstGradient}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Depth Level:</span>
                        <strong className="text-[#EAF6F7]">{selectedPFZ.depthMeters} m</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Target Species:</span>
                        <strong className="text-[#39D6D0]">{selectedPFZ.dominantSpecies.join(', ')}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePage('fishing')}
                      className="w-full py-2 bg-[#39D6D0] text-[#06131A] font-bold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>Open Fishing Explorer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'legend' && (
                <div className="space-y-3 text-xs font-data-label">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#39D6D0]">
                    Map Color Key & Scales
                  </span>

                  <div className="p-3 rounded-xl bg-[#0B2630] space-y-2 border border-[#24404A]">
                    <span className="text-[#EAF6F7] font-semibold block">SST Temperature Scale (°C)</span>
                    <div className="h-3 rounded-full bg-gradient-to-r from-[#116579] via-[#39D6D0] to-[#F4C95D]" />
                    <div className="flex justify-between text-[10px] text-[#9BB3B8] font-mono-code">
                      <span>24.0°C</span>
                      <span>27.5°C</span>
                      <span>31.0°C</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B2630] space-y-2 border border-[#24404A]">
                    <span className="text-[#EAF6F7] font-semibold block">Chlorophyll Density (mg/m³)</span>
                    <div className="h-3 rounded-full bg-gradient-to-r from-[#06131A] via-[#75E6B5] to-[#39D6D0]" />
                    <div className="flex justify-between text-[10px] text-[#9BB3B8] font-mono-code">
                      <span>0.1 mg/m³</span>
                      <span>1.5 mg/m³</span>
                      <span>3.0+ mg/m³</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Quick Actions Toolbar */}
      <div className="absolute bottom-4 left-4 z-20 bg-[#081C24]/90 backdrop-blur-md p-2 rounded-xl border border-[#24404A] shadow-xl transition-all duration-300">
        {isActionsCollapsed ? (
          <button
            onClick={() => setIsActionsCollapsed(false)}
            className="p-1.5 text-[#39D6D0] hover:text-[#EAF6F7] flex items-center space-x-1.5 text-xs font-bold font-manrope"
            title="Expand Actions"
          >
            <Compass className="w-4 h-4" />
            <span>Actions</span>
            <ChevronUp className="w-3.5 h-3.5 text-[#9BB3B8]" />
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActivePage('ask')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-bold text-xs font-manrope rounded-lg hover:brightness-110 transition-all flex items-center space-x-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Query Grid Intelligence</span>
            </button>

            <button
              onClick={() => setActivePage('routes')}
              className="px-3.5 py-1.5 bg-[#0B2630] text-[#EAF6F7] border border-[#24404A] hover:border-[#39D6D0]/40 font-bold text-xs font-manrope rounded-lg transition-all flex items-center space-x-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-[#39D6D0]" />
              <span>Plan Route Here</span>
            </button>

            <button
              onClick={() => setIsActionsCollapsed(true)}
              className="p-1 hover:bg-[#0B2630] rounded text-[#9BB3B8] hover:text-[#EAF6F7] transition-colors"
              title="Collapse Actions"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
