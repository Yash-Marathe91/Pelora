import React from 'react';
import { Target, CheckCircle2, Clock, Navigation, ShieldCheck, Activity } from 'lucide-react';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const MissionsView: React.FC = () => {
  const missions = [
    { id: 'MIS-01', title: 'Ratnagiri Deep Offshore PFZ Harvest Voyage', vessel: 'Sea Explorer II', status: 'In Progress', progress: 68, eta: '10:10 IST' },
    { id: 'MIS-02', title: 'Angria Bank Coral Reef Hydrographic Survey', vessel: 'Pelora Research One', status: 'Active', progress: 45, eta: '14:30 IST' },
    { id: 'MIS-03', title: 'Coastal Squall Patrol & Hazard Sweep', vessel: 'Coastguard Cutter 04', status: 'Completed', progress: 100, eta: 'Done' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#75E6B5] mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>MISSION CONTROL WORKSPACE</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Active Fleet Missions & Operation Tracking
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Monitor vessel trip progress, waypoint compliance, and fuel consumption per mission.
          </p>
        </div>
        <FreshnessIndicator freshness="Mission Telemetry Active" sourceCount={4} />
      </div>

      <div className="space-y-4">
        {missions.map((m) => (
          <div key={m.id} className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold font-data-label uppercase text-[#39D6D0]">{m.id}</span>
                <h3 className="text-base font-bold font-manrope text-[#EAF6F7]">{m.title}</h3>
              </div>
              <span className="text-xs font-bold text-[#75E6B5] bg-[#75E6B5]/10 px-3 py-1 rounded-full border border-[#75E6B5]/30 font-data-label">
                {m.status}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#9BB3B8] font-data-label">
                <span>Vessel: {m.vessel}</span>
                <span>ETA: {m.eta} ({m.progress}% Complete)</span>
              </div>
              <div className="w-full bg-[#06131A] h-2 rounded-full overflow-hidden border border-[#24404A]">
                <div className="bg-gradient-to-r from-[#0E4350] to-[#39D6D0] h-full rounded-full" style={{ width: `${m.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
