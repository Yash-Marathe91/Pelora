import React from 'react';
import { Database, Satellite, Anchor, Radio, CheckCircle2, Activity } from 'lucide-react';
import { MarineDataService } from '@/services/marineDataService';

export const DataFeedsView: React.FC = () => {
  const feeds = MarineDataService.getEvidenceSources();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#39D6D0] mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>DATA FEEDS & INTEGRATIONS</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Oceanographic Pipeline & API Telemetry
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Live ingestion monitoring for ISRO, NOAA, INCOIS, and NIOT buoy sensor feeds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {feeds.map((f) => (
          <div key={f.id} className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-data-label uppercase text-[#39D6D0]">{f.sourceType}</span>
              <span className="text-xs text-[#75E6B5] font-data-label font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{f.reliabilityScore}% Sync</span>
              </span>
            </div>
            <h3 className="text-base font-bold font-manrope text-[#EAF6F7]">{f.sourceName}</h3>
            <p className="text-xs text-[#9BB3B8]">{f.keyFinding}</p>
            <div className="text-[11px] text-[#9BB3B8] font-data-label pt-2 border-t border-[#24404A]/60">
              Freshness: <strong className="text-[#39D6D0]">{f.freshness}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
