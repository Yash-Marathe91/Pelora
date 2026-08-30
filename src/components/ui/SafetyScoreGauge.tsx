import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

interface SafetyScoreGaugeProps {
  score: number; // 0 - 100
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SafetyScoreGauge: React.FC<SafetyScoreGaugeProps> = ({
  score,
  title = 'Safety Index',
  subtitle,
  size = 'md',
}) => {
  let strokeColor = '#75E6B5'; // Seafoam Safe
  let statusText = 'FAVOURABLE';
  let Icon = ShieldCheck;

  if (score < 60) {
    strokeColor = '#FF5B63';
    statusText = 'CRITICAL RISK';
    Icon = ShieldAlert;
  } else if (score < 80) {
    strokeColor = '#F4C95D';
    statusText = 'MODERATE CAUTION';
    Icon = AlertTriangle;
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center space-x-3 bg-[#081C24]/90 p-3 rounded-xl border border-[#24404A]">
      <div className="relative flex items-center justify-center w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#0B2630"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={strokeColor}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-bold font-manrope text-[#EAF6F7]">{score}</span>
          <span className="text-[9px] text-[#9BB3B8] font-data-label font-semibold">/100</span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <Icon className="w-4 h-4" style={{ color: strokeColor }} />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9BB3B8] font-data-label">
            {title}
          </span>
        </div>
        <span className="text-sm font-bold font-manrope tracking-tight mt-0.5" style={{ color: strokeColor }}>
          {statusText}
        </span>
        {subtitle && (
          <span className="text-[11px] text-[#9BB3B8] mt-0.5">{subtitle}</span>
        )}
      </div>
    </div>
  );
};
