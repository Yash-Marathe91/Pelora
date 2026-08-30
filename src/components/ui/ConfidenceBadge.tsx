import React from 'react';
import { ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface ConfidenceBadgeProps {
  score: number; // 0 - 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  label,
  size = 'md',
  showIcon = true,
}) => {
  let colorClasses = 'bg-[#75E6B5]/10 text-[#75E6B5] border-[#75E6B5]/30';
  let ratingText = 'High Confidence';

  if (score < 60) {
    colorClasses = 'bg-[#FF5B63]/10 text-[#FF5B63] border-[#FF5B63]/30';
    ratingText = 'Low Confidence';
  } else if (score < 85) {
    colorClasses = 'bg-[#F4C95D]/10 text-[#F4C95D] border-[#F4C95D]/30';
    ratingText = 'Moderate Confidence';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5',
    lg: 'text-sm px-3.5 py-1.5 space-x-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium font-data-label ${colorClasses} ${sizeClasses}`}
    >
      {showIcon && (
        score >= 85 ? (
          <ShieldCheck className="w-3.5 h-3.5" />
        ) : score >= 60 ? (
          <Sparkles className="w-3.5 h-3.5" />
        ) : (
          <ShieldAlert className="w-3.5 h-3.5" />
        )
      )}
      <span>{score}% {label || ratingText}</span>
    </span>
  );
};
