import React from 'react';
import { Ship, Navigation, ShieldCheck, MapPin, User } from 'lucide-react';
import { MarineDataService } from '@/services/marineDataService';

export const VesselsView: React.FC = () => {
  const vessels = MarineDataService.getActiveVessels();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#75E6B5] mb-1">
            <Ship className="w-3.5 h-3.5" />
            <span>FLEET & VESSEL MANAGEMENT</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            AIS Vessel Registry & Telemetry Matrix
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Real-time GPS tracking, fuel levels, safety scores, and crew manifests for registered craft.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vessels.map((v) => (
          <div key={v.id} className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold font-data-label uppercase text-[#39D6D0]">{v.type}</span>
                <h3 className="text-base font-bold font-manrope text-[#EAF6F7]">{v.name}</h3>
              </div>
              <span className="text-xs font-bold text-[#75E6B5] font-manrope">{v.safetyScore}/100 Safe</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-data-label text-[#9BB3B8] pt-2 border-t border-[#24404A]/60">
              <div>MMSI: <strong className="text-[#EAF6F7]">{v.mmsi}</strong></div>
              <div>Home Port: <strong className="text-[#EAF6F7]">{v.homePort}</strong></div>
              <div>Speed: <strong className="text-[#39D6D0]">{v.speedKnots} kts</strong></div>
              <div>Crew Count: <strong className="text-[#EAF6F7]">{v.crewCount} Personnel</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
