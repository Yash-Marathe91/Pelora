import React from 'react';
import { Bell, ShieldAlert, AlertTriangle, CheckCircle2, Radio, Volume2 } from 'lucide-react';
import { usePeloraStore } from '@/store/usePeloraStore';

export const AlertsView: React.FC = () => {
  const { alerts, acknowledgeAlert } = usePeloraStore();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#F18A63] mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>EMERGENCY ALERT CENTER</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Real-Time Hazard & Distress Alert Matrix
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Centralized hub for weather warnings, boundary incursions, and vessel SOS signals.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((a) => (
          <div key={a.id} className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-data-label uppercase text-[#F18A63]">{a.category} • {a.severity}</span>
              {a.acknowledged ? (
                <span className="text-xs font-bold text-[#75E6B5]">Acknowledged</span>
              ) : (
                <button
                  onClick={() => acknowledgeAlert(a.id)}
                  className="px-3 py-1 bg-[#0B2630] border border-[#39D6D0]/40 text-[#39D6D0] text-xs font-bold font-manrope rounded-lg"
                >
                  Acknowledge Alert
                </button>
              )}
            </div>
            <h3 className="text-base font-bold font-manrope text-[#EAF6F7]">{a.title}</h3>
            <p className="text-xs text-[#9BB3B8] leading-relaxed">{a.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
