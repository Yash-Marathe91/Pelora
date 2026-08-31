import React, { useState, useEffect, useRef } from 'react';
import { Layers, Eye, Compass, RefreshCw, MapPin, Navigation, Fish, ShieldAlert, Waves, Map as MapIcon } from 'lucide-react';
import { MarineDataService } from '@/services/marineDataService';
import { usePeloraStore } from '@/store/usePeloraStore';
import { PFZZone, Vessel } from '@/types/pelora';

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
  const mapRef = useRef<any>(null);
  const { vesselsList, pfzList, liveRasterData, isSyncingLiveData, syncLiveDataFromBackend, lastDataSyncTime } = usePeloraStore();
  const [activeLayers, setActiveLayers] = useState({
    sst: true,
    chlorophyll: true,
    pfz: true,
    vessels: true,
    hazards: false,
  });

  const [basemapStyle, setBasemapStyle] = useState<'maptiler' | 'carto-dark' | 'osm'>('maptiler');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Automatically trigger live data ingestion sync on mount
    syncLiveDataFromBackend();

    const initMap = async () => {
      try {
        const maplibre = await import('maplibre-gl');
        if (mapContainerRef.current) {
          const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
          const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || '0BtEUqmTGZH3RevPusZZ';

          // Choose tile style based on selection or fallback
          let styleConfig: any = `https://api.maptiler.com/maps/ocean/style.json?key=${maptilerKey}`;

          if (basemapStyle === 'osm') {
            styleConfig = {
              version: 8,
              sources: {
                'osm-tiles': {
                  type: 'raster',
                  tiles: [
                    'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                  ],
                  tileSize: 256,
                },
              },
              layers: [
                {
                  id: 'osm-layer',
                  type: 'raster',
                  source: 'osm-tiles',
                  minzoom: 0,
                  maxzoom: 19,
                },
              ],
            };
          } else if (basemapStyle === 'carto-dark') {
            styleConfig = {
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
            };
          }

          if (mapRef.current) {
            mapRef.current.remove();
          }

          const map = new maplibre.Map({
            container: mapContainerRef.current,
            style: styleConfig,
            center: [72.82, 16.44], // Arabian Sea - Ratnagiri Offshore
            zoom: 7.5,
          });

          mapRef.current = map;

          map.on('load', () => {
            setMapLoaded(true);
            map.resize();
          });

          map.on('error', (e: any) => {
            console.warn('MapLibre layer info:', e);
          });
        }
      } catch (err) {
        console.warn('MapLibre GL JS fallback mode active', err);
        setMapLoaded(true);
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [basemapStyle]);

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#24404A] bg-[#06131A]" style={{ height }}>
      {/* MapLibre Canvas Container (100% visible real map tiles) */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Subtle radar line grid overlay (pointer-events-none, fully transparent so map is visible) */}
      <div className="absolute inset-0 pointer-events-none border border-[#39D6D0]/10 z-1" />

      {/* Live Map Pins & Dynamic Data Layer Overlays */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {/* Copernicus Satellite Raster Grid Points */}
        {activeLayers.sst && liveRasterData && liveRasterData.grid_data.map((pt: any, idx: number) => (
          <div
            key={idx}
            className="absolute w-3.5 h-3.5 rounded-full bg-[#39D6D0]/60 border border-[#39D6D0] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer shadow-lg hover:scale-125 transition-transform"
            style={{
              left: `${20 + (idx % 5) * 15}%`,
              top: `${25 + Math.floor(idx / 5) * 12}%`,
            }}
            title={`SST: ${pt.sst_celsius}°C, Chl-a: ${pt.chlorophyll_mg_m3} mg/m³`}
          />
        ))}

        {/* PFZ Polygons Markers */}
        {activeLayers.pfz &&
          pfzList.map((pfz: PFZZone, idx: number) => (
            <div
              key={pfz.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto group"
              style={{
                left: `${35 + idx * 25}%`,
                top: `${40 + idx * 15}%`,
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#39D6D0]/80 border-2 border-white flex items-center justify-center text-[#06131A] font-bold shadow-xl group-hover:scale-110 transition-transform">
                  <Fish className="w-4 h-4" />
                </div>
                <div className="absolute -bottom-8 bg-[#081C24]/95 text-[11px] font-bold font-data-label text-[#EAF6F7] px-2 py-0.5 rounded border border-[#24404A] whitespace-nowrap shadow-lg">
                  {pfz.zoneCode} ({pfz.potentialScore}/100)
                </div>
              </div>
            </div>
          ))}

        {/* Live Vessel AIS Telemetry Markers */}
        {activeLayers.vessels &&
          vesselsList.map((vessel: Vessel, idx: number) => (
            <div
              key={vessel.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto group transition-all duration-500"
              style={{
                left: `${28 + idx * 26}%`,
                top: `${55 - idx * 16}%`,
              }}
            >
              <div className="relative flex items-center space-x-1">
                <div className="w-7 h-7 rounded-md bg-[#75E6B5] border-2 border-[#06131A] flex items-center justify-center text-[#06131A] font-bold shadow-xl group-hover:scale-110 transition-transform">
                  <Navigation className="w-4 h-4 transform rotate-45" />
                </div>
                <span className="text-[10px] font-mono-code bg-[#06131A]/95 text-[#EAF6F7] px-2 py-0.5 rounded border border-[#24404A] shadow-md font-bold">
                  {vessel.name} ({vessel.speedKnots} kts)
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Map Header Status & Live Refresh Control */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-3 bg-[#081C24]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#24404A] text-xs shadow-2xl">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#75E6B5] animate-ping" />
          <span className="font-bold text-[#EAF6F7] font-manrope">Arabian Sea Map Grid</span>
        </div>
        <span className="text-[#9BB3B8] font-mono-code text-[11px]">16.44°N, 72.82°E</span>
        <button
          onClick={() => syncLiveDataFromBackend()}
          disabled={isSyncingLiveData}
          className="ml-2 px-2.5 py-1 rounded-lg bg-[#0B2630] hover:bg-[#116579] border border-[#39D6D0]/40 text-[#39D6D0] hover:text-[#EAF6F7] font-bold font-data-label text-[11px] transition-all flex items-center space-x-1.5 disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncingLiveData ? 'animate-spin' : ''}`} />
          <span>{isSyncingLiveData ? 'Syncing...' : 'Sync Live Grid'}</span>
        </button>
      </div>

      {/* Layer & Basemap Switcher Panel (Top Right) */}
      {showControls && (
        <div className="absolute top-4 right-4 z-10 bg-[#081C24]/95 backdrop-blur-md p-3 rounded-xl border border-[#24404A] shadow-2xl text-xs space-y-2.5 w-52">
          <div className="flex items-center justify-between border-b border-[#24404A] pb-2">
            <span className="font-bold text-[#EAF6F7] font-manrope flex items-center space-x-1.5">
              <MapIcon className="w-3.5 h-3.5 text-[#39D6D0]" />
              <span>Basemap Style</span>
            </span>
          </div>

          {/* Basemap Selection Buttons */}
          <div className="grid grid-cols-3 gap-1 bg-[#06131A] p-1 rounded-lg border border-[#24404A]">
            <button
              onClick={() => setBasemapStyle('maptiler')}
              className={`py-1 text-[10px] font-bold rounded transition-colors ${
                basemapStyle === 'maptiler' ? 'bg-[#39D6D0] text-[#06131A]' : 'text-[#9BB3B8] hover:text-white'
              }`}
            >
              Ocean
            </button>
            <button
              onClick={() => setBasemapStyle('osm')}
              className={`py-1 text-[10px] font-bold rounded transition-colors ${
                basemapStyle === 'osm' ? 'bg-[#39D6D0] text-[#06131A]' : 'text-[#9BB3B8] hover:text-white'
              }`}
            >
              Street
            </button>
            <button
              onClick={() => setBasemapStyle('carto-dark')}
              className={`py-1 text-[10px] font-bold rounded transition-colors ${
                basemapStyle === 'carto-dark' ? 'bg-[#39D6D0] text-[#06131A]' : 'text-[#9BB3B8] hover:text-white'
              }`}
            >
              Dark
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-[#24404A] pt-1 pb-1.5">
            <span className="font-bold text-[#EAF6F7] font-manrope flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#39D6D0]" />
              <span>Marine Data</span>
            </span>
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
      <div className="absolute bottom-4 left-4 z-10 bg-[#081C24]/95 backdrop-blur-md p-2.5 rounded-xl border border-[#24404A] text-[11px] font-data-label flex items-center space-x-4 shadow-2xl">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#39D6D0]" />
          <span className="text-[#EAF6F7]">High PFZ</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#75E6B5]" />
          <span className="text-[#EAF6F7]">Vessel Track</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F4C95D]" />
          <span className="text-[#EAF6F7]">Thermal Front</span>
        </div>
      </div>
    </div>
  );
};

