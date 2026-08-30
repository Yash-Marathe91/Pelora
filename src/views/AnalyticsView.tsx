import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { BarChart3, TrendingUp, Activity, Waves, Clock, Calendar, Download, RefreshCw, Layers } from 'lucide-react';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Simulated hydrographic 7-day time series data
  const sstSeries = [
    { day: 'Mon', sst: 26.8, chlorophyll: 1.2, wave: 0.7 },
    { day: 'Tue', sst: 27.1, chlorophyll: 1.4, wave: 0.8 },
    { day: 'Wed', sst: 27.4, chlorophyll: 1.82, wave: 0.9 },
    { day: 'Thu', sst: 27.6, chlorophyll: 1.95, wave: 1.1 },
    { day: 'Fri', sst: 27.2, chlorophyll: 1.6, wave: 1.0 },
    { day: 'Sat', sst: 26.9, chlorophyll: 1.3, wave: 0.8 },
    { day: 'Sun', sst: 27.3, chlorophyll: 1.7, wave: 0.9 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#F4C95D] mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>OCEAN HYDROGRAPHIC ANALYTICS</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Multi-Variable Marine Time Series & Anomalies
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Long-term SST trend analysis, chlorophyll concentration profiles, and thermal front detection.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-[#081C24] p-1 rounded-xl border border-[#24404A] text-xs font-manrope">
            {['24h', '7d', '30d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg transition-colors font-bold ${
                  timeRange === range
                    ? 'bg-[#39D6D0] text-[#06131A]'
                    : 'text-[#9BB3B8] hover:text-[#EAF6F7]'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-2">
          <span className="text-[10px] font-bold font-data-label text-[#9BB3B8] uppercase">Mean Sea Temp</span>
          <h3 className="text-2xl font-extrabold font-manrope text-[#EAF6F7]">27.4 °C</h3>
          <span className="text-xs text-[#75E6B5] font-data-label flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.8°C above 10y baseline</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-2">
          <span className="text-[10px] font-bold font-data-label text-[#9BB3B8] uppercase">Avg Chlorophyll</span>
          <h3 className="text-2xl font-extrabold font-manrope text-[#75E6B5]">1.82 mg/m³</h3>
          <span className="text-xs text-[#39D6D0] font-data-label">Active coastal upwelling</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-2">
          <span className="text-[10px] font-bold font-data-label text-[#9BB3B8] uppercase">Mean Wave Height</span>
          <h3 className="text-2xl font-extrabold font-manrope text-[#EAF6F7]">0.9 m</h3>
          <span className="text-xs text-[#9BB3B8] font-data-label">Swell period 6.2 seconds</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-2">
          <span className="text-[10px] font-bold font-data-label text-[#9BB3B8] uppercase">Salinity Index</span>
          <h3 className="text-2xl font-extrabold font-manrope text-[#EAF6F7]">35.4 PSU</h3>
          <span className="text-xs text-[#75E6B5] font-data-label">Normal marine baseline</span>
        </div>
      </div>

      {/* Hydrographic Trend Visualization Panel */}
      <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#24404A] pb-4">
          <div>
            <h3 className="text-base font-bold font-manrope text-[#EAF6F7]">
              Arabian Sea Hydrographic Time Series (Past 7 Days)
            </h3>
            <span className="text-xs text-[#9BB3B8] font-data-label">
              Cross-validated INCOIS buoy AS-04 & ISRO Oceansat-3 altimetry
            </span>
          </div>
          <FreshnessIndicator freshness="INCOIS Altimetry Sync" sourceCount={4} />
        </div>

        {/* Visual Bar Chart Representation */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-7 gap-3 h-48 items-end border-b border-[#24404A] pb-4">
            {sstSeries.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 h-full justify-end group">
                <span className="text-[10px] font-mono-code text-[#39D6D0] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.sst}°C
                </span>
                <div
                  className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-[#0E4350] to-[#39D6D0] transition-all group-hover:brightness-125"
                  style={{ height: `${((item.sst - 25) / 4) * 100}%` }}
                />
                <span className="text-xs font-bold text-[#9BB3B8] font-manrope">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-data-label text-[#9BB3B8] pt-2">
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-[#39D6D0]" />
              <span>Sea Surface Temperature (°C)</span>
            </span>
            <span>Peak Thermal Convergence: Thursday 14:00 IST</span>
          </div>
        </div>
      </div>
    </div>
  );
};
