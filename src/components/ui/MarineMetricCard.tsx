import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MarineMetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  status?: 'safe' | 'warning' | 'critical' | 'neutral';
  icon: LucideIcon;
  subtitle?: string;
}

export const MarineMetricCard: React.FC<MarineMetricCardProps> = ({
  label,
  value,
  unit,
  change,
  status = 'neutral',
  icon: Icon,
  subtitle,
}) => {
  const statusColors = {
    safe: 'text-[#75E6B5] border-[#75E6B5]/30 bg-[#75E6B5]/5',
    warning: 'text-[#F4C95D] border-[#F4C95D]/30 bg-[#F4C95D]/5',
    critical: 'text-[#FF5B63] border-[#FF5B63]/30 bg-[#FF5B63]/5',
    neutral: 'text-[#39D6D0] border-[#24404A] bg-[#0B2630]/60',
  }[status];

  return (
    <div className={`p-4 rounded-xl border pelora-card transition-all duration-200 hover:border-[#39D6D0]/50 ${statusColors}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#9BB3B8] font-data-label uppercase tracking-wider">
          {label}
        </span>
        <div className="p-2 rounded-lg bg-[#081C24] border border-[#24404A] text-[#39D6D0]">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline space-x-1.5">
        <span className="text-2xl font-bold font-manrope text-[#EAF6F7]">{value}</span>
        {unit && <span className="text-xs text-[#9BB3B8] font-data-label font-medium">{unit}</span>}
      </div>
      {(change || subtitle) && (
        <div className="mt-2 flex items-center justify-between text-[11px] font-data-label text-[#9BB3B8]">
          {change && <span className="text-[#75E6B5]">{change}</span>}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
