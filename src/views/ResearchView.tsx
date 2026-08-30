import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { Microscope, FileText, Download, Calendar, Database, Search, Code, CheckCircle2, ArrowRight } from 'lucide-react';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const ResearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const datasets = [
    { title: 'Arabian Sea SST & Chlorophyll Convergence (ISRO Oceansat-3)', format: 'NetCDF / GeoTIFF', size: '2.4 GB', date: '2026-08-29' },
    { title: 'INCOIS Coastal Moored Buoy Time Series (2020 - 2026)', format: 'CSV / Parquet', size: '480 MB', date: '2026-08-30' },
    { title: 'CMFRI Pelagic Fish Landings & Species Taxonomy Matrix', format: 'JSON / GeoJSON', size: '120 MB', date: '2026-08-25' },
    { title: 'WaveWatch III Arabian Sea Wave Energy & Swell Forecast', format: 'GRIB2', size: '1.8 GB', date: '2026-08-30' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#39D6D0] mb-1">
            <Microscope className="w-3.5 h-3.5" />
            <span>OCEANOGRAPHIC RESEARCH WORKSPACE</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Oceanographic Notebooks & Open Datasets
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Access raw satellite telemetry, NetCDF hydrographic grids, and AI ocean models.
          </p>
        </div>

        <FreshnessIndicator freshness="Scientific Data Portal Sync" sourceCount={4} />
      </div>

      {/* Dataset Search Bar */}
      <div className="p-4 rounded-2xl bg-[#081C24] border border-[#24404A] shadow-xl flex items-center space-x-3">
        <Search className="w-5 h-5 text-[#39D6D0]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search research datasets by topic, satellite sensor, or region..."
          className="flex-1 bg-transparent border-none text-sm text-[#EAF6F7] placeholder-[#9BB3B8]/60 focus:outline-none font-manrope"
        />
      </div>

      {/* Datasets List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-manrope text-[#EAF6F7]">Available Scientific Datasets</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {datasets.map((ds, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#081C24] border border-[#24404A] hover:border-[#39D6D0]/40 transition-all space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold font-data-label uppercase text-[#39D6D0]">{ds.format}</span>
                  <h4 className="text-sm font-bold font-manrope text-[#EAF6F7] mt-0.5">{ds.title}</h4>
                </div>
                <span className="text-xs font-mono-code text-[#9BB3B8]">{ds.size}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-data-label text-[#9BB3B8] pt-2 border-t border-[#24404A]/60">
                <span>Updated: {ds.date}</span>
                <button className="px-3 py-1.5 bg-[#0B2630] border border-[#39D6D0]/40 text-[#39D6D0] hover:bg-[#0E4350] font-bold text-xs font-manrope rounded-lg transition-colors flex items-center space-x-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Data</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
