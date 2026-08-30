import React from 'react';
import { Smartphone, Download, WifiOff, MapPin, Fish, ShieldAlert, ArrowRight } from 'lucide-react';
import { usePeloraStore } from '@/store/usePeloraStore';

export const MobileView: React.FC = () => {
  const { setActivePage } = usePeloraStore();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#75E6B5] mb-1">
            <Smartphone className="w-3.5 h-3.5" />
            <span>MOBILE PWA COMPANION WORKSPACE</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Offline Vessel Companion & Mobile Simulator
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Low-bandwidth offline progressive web app for fishermen and vessel captains offshore.
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto p-6 rounded-3xl bg-[#081C24] border border-[#39D6D0]/40 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#24404A] pb-3">
          <span className="text-xs font-bold font-data-label text-[#39D6D0]">PELORA PWA MOBILE</span>
          <span className="text-[10px] font-bold text-[#75E6B5] bg-[#75E6B5]/10 px-2 py-0.5 rounded-full border border-[#75E6B5]/30">
            OFFLINE READY
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#06131A] border border-[#24404A] text-center space-y-2">
          <WifiOff className="w-6 h-6 text-[#F4C95D] mx-auto" />
          <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">No Cellular Data Needed</h4>
          <p className="text-xs text-[#9BB3B8]">
            Pre-downloaded satellite PFZ maps & nautical waypoints remain functional 50km offshore.
          </p>
        </div>

        <button
          onClick={() => setActivePage('map')}
          className="w-full py-3 bg-[#39D6D0] text-[#06131A] font-extrabold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>Open Mobile Ocean Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
