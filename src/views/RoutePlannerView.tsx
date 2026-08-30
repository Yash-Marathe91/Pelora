import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { MarineDataService } from '@/services/marineDataService';
import { Navigation, MapPin, ShieldCheck, Compass, Fuel, Clock, ArrowRight, Zap, CheckCircle2, AlertTriangle, Layers, Send, Download } from 'lucide-react';
import { MapShell } from '@/components/maps/MapShell';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const RoutePlannerView: React.FC = () => {
  const { setActivePage, activePFZ } = usePeloraStore();
  const [routeMode, setRouteMode] = useState<'safest' | 'fastest' | 'fuel'>('safest');
  const [origin, setOrigin] = useState('Ratnagiri South Jetty (MH-RTG-01)');
  const [destination, setDestination] = useState(
    activePFZ ? `Zone ${activePFZ.zoneCode} (${activePFZ.regionName})` : 'Zone PFZ-AR-09 (Offshore Ratnagiri)'
  );
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatched(true);
      setTimeout(() => setDispatched(false), 4000);
    }, 1200);
  };

  const waypoints = [
    { name: 'Dep: Ratnagiri South Jetty', lat: '16.98°N', lon: '73.28°E', dist: '0 NM', eta: '06:00 IST', wave: '0.4m', fuel: '0 L' },
    { name: 'WP-1: Coastal Deep Water Channel', lat: '16.70°N', lon: '73.05°E', dist: '18 NM', eta: '07:15 IST', wave: '0.7m', fuel: '45 L' },
    { name: 'WP-2: Thermal Front Corridor', lat: '16.44°N', lon: '72.82°E', dist: '34 NM', eta: '08:45 IST', wave: '0.9m', fuel: '82 L' },
    { name: 'Arr: Zone PFZ-AR-09 Harvest Point', lat: '16.15°N', lon: '72.60°E', dist: '52 NM', eta: '10:10 IST', wave: '0.9m', fuel: '124 L' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#6AE7E2] mb-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>SMART NAUTICAL ROUTE PLANNER</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Risk-Aware Multi-Objective Routing Engine
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Optimizes transit paths by combining bathymetry, ocean surface currents, and wave hazard forecasts.
          </p>
        </div>

        <FreshnessIndicator freshness="Hydrographic Routing Active" sourceCount={4} />
      </div>

      {/* Main Grid: Route Form & Waypoints (5 Cols) + Map & Profile (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Routing Parameters & Waypoints */}
        <div className="lg:col-span-5 space-y-6">
          {/* Optimization Mode Selector */}
          <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider">
              1. Select Optimization Objective
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'safest', label: 'Safest Route', icon: ShieldCheck, color: '#75E6B5' },
                { id: 'fuel', label: 'Fuel Efficient', icon: Fuel, color: '#39D6D0' },
                { id: 'fastest', label: 'Fastest Direct', icon: Zap, color: '#F4C95D' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = routeMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setRouteMode(m.id as any)}
                    className={`p-3 rounded-xl border text-center text-xs font-bold font-manrope transition-all flex flex-col items-center justify-center space-y-1.5 ${
                      isSelected
                        ? 'bg-[#39D6D0]/10 border-[#39D6D0] text-[#39D6D0]'
                        : 'bg-[#06131A] border-[#24404A] text-[#9BB3B8] hover:text-[#EAF6F7]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] text-[#9BB3B8] font-data-label font-medium mb-1">
                  Origin Port / Departure Point
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-[#06131A] border border-[#24404A] rounded-xl px-3 py-2 text-xs text-[#EAF6F7] font-manrope pl-9"
                  />
                  <MapPin className="w-4 h-4 text-[#39D6D0] absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#9BB3B8] font-data-label font-medium mb-1">
                  Destination Zone / Target Coordinates
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#06131A] border border-[#24404A] rounded-xl px-3 py-2 text-xs text-[#EAF6F7] font-manrope pl-9"
                  />
                  <Navigation className="w-4 h-4 text-[#75E6B5] absolute left-3 top-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Calculated Waypoints Timeline */}
          <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#24404A] pb-3">
              <h3 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider">
                2. Nautical Waypoints & Leg Profile
              </h3>
              <span className="text-[11px] text-[#75E6B5] font-data-label font-bold">
                Total: 52 NM • Est 124L Fuel
              </span>
            </div>

            <div className="space-y-3">
              {waypoints.map((wp, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#06131A] border border-[#24404A] flex items-center justify-between text-xs font-manrope"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#39D6D0]/10 text-[#39D6D0] flex items-center justify-center font-bold text-[11px] font-mono-code">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#EAF6F7]">{wp.name}</h4>
                      <span className="text-[10px] text-[#9BB3B8] font-mono-code">{wp.lat}, {wp.lon}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#39D6D0] block">{wp.dist}</span>
                    <span className="text-[10px] text-[#9BB3B8] font-data-label">ETA {wp.eta} • Wave {wp.wave}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={handleDispatch}
                disabled={isDispatching}
                className="w-full py-3 bg-gradient-to-r from-[#39D6D0] to-[#6AE7E2] text-[#06131A] font-extrabold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isDispatching ? 'Dispatching to Vessel AIS...' : dispatched ? 'Waypoints Dispatched to AIS!' : 'Dispatch Waypoints to Vessel AIS'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Map Preview & Route Metrics */}
        <div className="lg:col-span-7 space-y-6">
          {/* Map Preview Shell */}
          <div className="h-[420px] rounded-2xl overflow-hidden border border-[#24404A] shadow-2xl">
            <MapShell height="100%" showControls={true} />
          </div>

          {/* Route Performance Metrics Card */}
          <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
              <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Total Distance</span>
              <span className="text-lg font-extrabold text-[#EAF6F7] font-manrope">52 Nautical Miles</span>
            </div>
            <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
              <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Est. Fuel Usage</span>
              <span className="text-lg font-extrabold text-[#75E6B5] font-manrope">124 Liters Diesel</span>
            </div>
            <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
              <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Max Wave Surge</span>
              <span className="text-lg font-extrabold text-[#39D6D0] font-manrope">0.9 m Calm</span>
            </div>
            <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A]">
              <span className="text-[10px] text-[#9BB3B8] block font-data-label uppercase">Safety Rating</span>
              <span className="text-lg font-extrabold text-[#75E6B5] font-manrope">96 / 100 Safe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
