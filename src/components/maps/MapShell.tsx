import React, { useState, useEffect, useRef } from 'react';
import { Layers, Eye, Compass, RefreshCw, MapPin, Navigation, Fish, ShieldAlert, Waves } from 'lucide-react';
import { MarineDataService } from '@/services/marineDataService';

interface MapShellProps {
  height?: string;
  showControls?: boolean;
  interactive?: boolean;
}

export const MapShell: React.FC<MapShellProps> = ({
  height = '100%',
  showControls = true,
  interactive = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeLayers, setActiveLayers] = useState({
    sst: true,
    chlorophyll: true,
    pfz: true,
    vessels: true,
    hazards: false,
  });

  const [mapLoaded, setMapLoaded] = useState(false);
  const pfzList = MarineDataService.getTopPFZones();
  const vesselList = MarineDataService.getActiveVessels();

  useEffect(() => {
    // Attempt MapLibre initialization if maplibre-gl is available in browser context
    let map: any = null;
    const initMap = async () => {
      try {
        const maplibre = await import('maplibre-gl');
        if (mapContainerRef.current) {
          map = new maplibre.Map({
            container: mapContainerRef.current,
            style: {
              version: 8,
              sources: {
                'carto-dark': {
                  type: 'raster',
                  tiles: [
                    'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                    'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                  ],
                  tileSize: 256,
                },
              },
              layers: [
                {
                  id: 'carto-dark-layer',
                  type: 'raster',
                  source: 'carto-dark',
                  minzoom: 0,
                  maxzoom: 19,
                },
              ],
            },
            center: [72.82, 16.44], // Arabian Sea - Ratnagiri Offshore
            zoom: 7.5,
          });

          map.on('load', () => {
            setMapLoaded(true);
          });
        }
      } catch (err) {
        console.warn('MapLibre GL JS fallback mode active', err);
        setMapLoaded(true);
      }
    };

    initMap();

    return () => {
      if (map) map.remove();
    };
  }, []);

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#24404A] bg-[#06131A]" style={{ height }}>
      {/* MapLibre Canvas Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Simulated Marine Canvas Overlay (for high-fidelity visual rendering of SST thermal gradients & PFZ polygons) */}
      <div className="absolute inset-0 pointer-events-none bg-radial-biolum opacity-60" />

      {/* Radar Overlay Graphics */}
      <div className="absolute inset-0 pointer-events-none radar-sweep-bg flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full border border-[#39D6D0]/10 animate-pulse-subtle" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#39D6D0]/20" />
      </div>

      {/* Live Map Pins & Overlays */}
      <div className="absolute inset-0 pointer-events-auto">
        {/* PFZ Polygons Markers */}
        {activeLayers.pfz &&
          pfzList.map((pfz, idx) => (
            <div
              key={pfz.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${35 + idx * 25}%`,
                top: `${40 + idx * 15}%`,
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#39D6D0]/20 border border-[#39D6D0] flex items-center justify-center text-[#39D6D0] group-hover:scale-110 transition-transform">
                  <Fish className="w-4 h-4" />
                </div>
                <div className="absolute -bottom-8 bg-[#081C24]/95 text-[11px] font-bold font-data-label text-[#EAF6F7] px-2 py-0.5 rounded border border-[#24404A] whitespace-nowrap shadow-lg">
                  {pfz.zoneCode} ({pfz.potentialScore}/100)
                </div>
              </div>
            </div>
          ))}

        {/* Vessel Markers */}
        {activeLayers.vessels &&
          vesselList.map((vessel, idx) => (
            <div
              key={vessel.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${28 + idx * 30}%`,
                top: `${55 - idx * 18}%`,
              }}
            >
              <div className="relative flex items-center space-x-1">
                <div className="w-6 h-6 rounded-md bg-[#0B2630] border border-[#75E6B5] flex items-center justify-center text-[#75E6B5] shadow-md">
                  <Navigation className="w-3.5 h-3.5 transform rotate-45" />
                </div>
                <span className="text-[10px] font-mono-code bg-[#06131A]/90 text-[#9BB3B8] px-1.5 py-0.5 rounded border border-[#24404A]">
                  {vessel.name} ({vessel.speedKnots} kts)
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Map Header Status & Compass */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-3 bg-[#081C24]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#24404A] text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#75E6B5] animate-ping" />
          <span className="font-bold text-[#EAF6F7] font-manrope">Arabian Sea Hydrographic Grid</span>
        </div>
        <span className="text-[#9BB3B8] font-mono-code text-[11px]">16.44°N, 72.82°E</span>
      </div>

      {/* Layer Controls Panel (Top Right) */}
      {showControls && (
        <div className="absolute top-4 right-4 z-10 bg-[#081C24]/95 backdrop-blur-md p-3 rounded-xl border border-[#24404A] shadow-xl text-xs space-y-2 w-48">
          <div className="flex items-center justify-between border-b border-[#24404A] pb-2">
            <span className="font-bold text-[#EAF6F7] font-manrope flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#39D6D0]" />
              <span>Marine Layers</span>
            </span>
            <span className="text-[10px] text-[#9BB3B8] font-data-label">Live Tiles</span>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => toggleLayer('sst')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[11px] font-data-label transition-colors ${
                activeLayers.sst ? 'bg-[#39D6D0]/10 text-[#39D6D0] border border-[#39D6D0]/30' : 'text-[#9BB3B8] hover:bg-[#0B2630]'
              }`}
            >
              <span>SST Fronts (°C)</span>
              <Eye className="w-3 h-3" />
            </button>

            <button
              onClick={() => toggleLayer('chlorophyll')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[11px] font-data-label transition-colors ${
                activeLayers.chlorophyll ? 'bg-[#75E6B5]/10 text-[#75E6B5] border border-[#75E6B5]/30' : 'text-[#9BB3B8] hover:bg-[#0B2630]'
              }`}
            >
              <span>Chlorophyll Bloom</span>
              <Eye className="w-3 h-3" />
            </button>

            <button
              onClick={() => toggleLayer('pfz')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[11px] font-data-label transition-colors ${
                activeLayers.pfz ? 'bg-[#39D6D0]/10 text-[#39D6D0] border border-[#39D6D0]/30' : 'text-[#9BB3B8] hover:bg-[#0B2630]'
              }`}
            >
              <span>PFZ Polygons</span>
              <Eye className="w-3 h-3" />
            </button>

            <button
              onClick={() => toggleLayer('vessels')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[11px] font-data-label transition-colors ${
                activeLayers.vessels ? 'bg-[#75E6B5]/10 text-[#75E6B5] border border-[#75E6B5]/30' : 'text-[#9BB3B8] hover:bg-[#0B2630]'
              }`}
            >
              <span>Active Vessels (AIS)</span>
              <Eye className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 bg-[#081C24]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#24404A] text-[11px] font-data-label flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#39D6D0]" />
          <span className="text-[#9BB3B8]">High PFZ</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#75E6B5]" />
          <span className="text-[#9BB3B8]">Vessel Track</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F4C95D]" />
          <span className="text-[#9BB3B8]">Thermal Front</span>
        </div>
      </div>
    </div>
  );
};
