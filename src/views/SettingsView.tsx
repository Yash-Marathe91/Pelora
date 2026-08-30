import React from 'react';
import { Settings, Shield, Sliders, Bell, Globe, Key } from 'lucide-react';
import { usePeloraStore } from '@/store/usePeloraStore';

export const SettingsView: React.FC = () => {
  const { systemSettings, setSystemSetting } = usePeloraStore();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#39D6D0] mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>SYSTEM SETTINGS & THRESHOLDS</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Platform Configuration & Alert Tolerances
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Configure safety score thresholds, satellite update frequencies, and offline data sync.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-6 shadow-xl max-w-3xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#06131A] border border-[#24404A]">
            <div>
              <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">High Wave Safety Threshold</h4>
              <p className="text-xs text-[#9BB3B8]">Trigger warning alert when wave height exceeds</p>
            </div>
            <span className="text-sm font-bold text-[#39D6D0] font-mono-code">{systemSettings.safetyThresholdWaveMeters} m</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#06131A] border border-[#24404A]">
            <div>
              <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">Satellite Data Refresh Rate</h4>
              <p className="text-xs text-[#9BB3B8]">Auto-fetch frequency for ISRO & NOAA satellite passes</p>
            </div>
            <span className="text-sm font-bold text-[#75E6B5] font-mono-code">{systemSettings.satelliteRefreshMinutes} mins</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#06131A] border border-[#24404A]">
            <div>
              <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">Offline PWA Sync Mode</h4>
              <p className="text-xs text-[#9BB3B8]">Pre-cache offline tiles & PFZ coordinates before departure</p>
            </div>
            <button
              onClick={() => setSystemSetting('offlineSyncEnabled', !systemSettings.offlineSyncEnabled)}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-manrope ${
                systemSettings.offlineSyncEnabled ? 'bg-[#75E6B5] text-[#06131A]' : 'bg-[#0B2630] text-[#9BB3B8]'
              }`}
            >
              {systemSettings.offlineSyncEnabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
