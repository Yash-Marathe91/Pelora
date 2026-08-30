import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { MarineDataService } from '@/services/marineDataService';
import { MarineAlert } from '@/types/pelora';
import { ShieldAlert, AlertTriangle, Radio, Bell, Ship, Navigation, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck, RefreshCw, Send } from 'lucide-react';
import { SafetyScoreGauge } from '@/components/ui/SafetyScoreGauge';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const SafetyView: React.FC = () => {
  const { setActivePage, alerts, acknowledgeAlert } = usePeloraStore();
  const vesselList = MarineDataService.getActiveVessels();
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#F18A63] mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SAFETY & DISASTER COMMAND CENTER</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Coastal Risk Surveillance & Early Warning
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Real-time multi-hazard monitoring, squall line alerts, and automated fleet advisory dispatch.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleBroadcast}
            className="px-4 py-2.5 bg-[#F18A63] text-[#06131A] font-extrabold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>{broadcastSent ? 'Advisory Broadcast Sent!' : 'Dispatch Warning to Fleet'}</span>
          </button>
        </div>
      </div>

      {/* Top Sector Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SafetyScoreGauge
          score={84}
          title="Arabian Sea Sector Safety"
          subtitle="28 Registered Crafts Monitored • Next 12h"
        />

        <div className="p-4 rounded-2xl bg-[#081C24] border border-[#24404A] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold font-data-label uppercase text-[#9BB3B8]">
              ACTIVE FLEET CRAFTS
            </span>
            <h3 className="text-2xl font-bold font-manrope text-[#EAF6F7] mt-0.5">
              28 Vessels Active
            </h3>
            <span className="text-xs text-[#75E6B5] font-data-label">27 Normal • 1 Caution</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0B2630] text-[#39D6D0] border border-[#24404A]">
            <Ship className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081C24] border border-[#24404A] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold font-data-label uppercase text-[#9BB3B8]">
              ACTIVE SAFETY ADVISORIES
            </span>
            <h3 className="text-2xl font-bold font-manrope text-[#F18A63] mt-0.5">
              {alerts.length} Active Advisories
            </h3>
            <span className="text-xs text-[#F4C95D] font-data-label">INCOIS & IMD Synced</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0B2630] text-[#F18A63] border border-[#24404A]">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Active Alerts List (7 Cols) + Fleet Safety Radar (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Alerts Feed */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold font-manrope text-[#EAF6F7] flex items-center space-x-2">
            <Bell className="w-4 h-4 text-[#F18A63]" />
            <span>Active Coastal Hazard Bulletins</span>
          </h3>

          <div className="space-y-4">
            {alerts.map((alert) => {
              const isAcknowledged = alert.acknowledged;
              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    alert.severity === 'critical'
                      ? 'bg-[#081C24] border-[#FF5B63]/60 shadow-lg'
                      : alert.severity === 'warning'
                      ? 'bg-[#081C24] border-[#F18A63]/50'
                      : 'bg-[#081C24] border-[#24404A]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`p-2 rounded-xl border ${
                          alert.severity === 'critical'
                            ? 'bg-[#FF5B63]/10 text-[#FF5B63] border-[#FF5B63]/30'
                            : 'bg-[#F18A63]/10 text-[#F18A63] border-[#F18A63]/30'
                        }`}
                      >
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold font-data-label uppercase tracking-widest text-[#F18A63]">
                          {alert.category.toUpperCase()} • {alert.severity.toUpperCase()}
                        </span>
                        <h4 className="text-base font-bold font-manrope text-[#EAF6F7]">
                          {alert.title}
                        </h4>
                      </div>
                    </div>

                    {isAcknowledged ? (
                      <span className="text-xs font-bold text-[#75E6B5] bg-[#75E6B5]/10 px-2.5 py-1 rounded-full border border-[#75E6B5]/30 font-data-label flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Acknowledged</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="px-3 py-1 bg-[#0B2630] border border-[#24404A] hover:border-[#39D6D0]/40 text-[#39D6D0] text-xs font-bold font-manrope rounded-lg transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[#9BB3B8] leading-relaxed font-manrope">
                    {alert.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-[#06131A] border border-[#24404A] text-xs font-manrope">
                    <span className="text-[#39D6D0] font-bold">Recommended Action: </span>
                    <span className="text-[#EAF6F7]">{alert.recommendedAction}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#9BB3B8] font-data-label pt-1 border-t border-[#24404A]/60">
                    <span>Issued: <strong className="text-[#EAF6F7]">{alert.issuedAt}</strong></span>
                    <span>Affected Crafts: <strong className="text-[#F18A63]">{alert.affectedVesselsCount || 1}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Monitored Fleet Vessels & Rapid Emergency Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Vessels Card */}
          <div className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4">
            <h3 className="text-xs font-bold text-[#EAF6F7] font-manrope uppercase tracking-wider flex items-center space-x-2 border-b border-[#24404A] pb-3">
              <Ship className="w-4 h-4 text-[#39D6D0]" />
              <span>Fleet Safety Telemetry</span>
            </h3>

            <div className="space-y-3">
              {vesselList.map((vessel) => (
                <div
                  key={vessel.id}
                  className="p-3.5 rounded-xl bg-[#06131A] border border-[#24404A] hover:border-[#39D6D0]/40 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-[#081C24] text-[#75E6B5] border border-[#24404A]">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-manrope text-[#EAF6F7]">{vessel.name}</h4>
                      <span className="text-[10px] text-[#9BB3B8] font-mono-code">MMSI: {vessel.mmsi}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#75E6B5] block font-manrope">
                      {vessel.safetyScore}/100 Safe
                    </span>
                    <span className="text-[10px] text-[#9BB3B8] font-data-label">
                      {vessel.speedKnots} kts • {vessel.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActivePage('vessels')}
              className="w-full py-2 bg-[#0B2630] border border-[#24404A] hover:border-[#39D6D0]/40 text-[#39D6D0] text-xs font-bold font-manrope rounded-xl transition-colors text-center block"
            >
              Open Fleet Intelligence Matrix →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
