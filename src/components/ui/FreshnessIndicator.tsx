import React from 'react';
import { Activity, Clock } from 'lucide-react';

interface FreshnessIndicatorProps {
  freshness: string;
  sourceCount?: number;
  isLive?: boolean;
}

export const FreshnessIndicator: React.FC<FreshnessIndicatorProps> = ({
  freshness,
  sourceCount = 4,
  isLive = true,
}) => {
  return (
    <div className="inline-flex items-center space-x-2 text-xs text-[#9BB3B8] font-data-label bg-[#081C24]/80 px-2.5 py-1 rounded-md border border-[#24404A]">
      <div className="relative flex h-2 w-2">
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39D6D0] opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-[#39D6D0]' : 'bg-[#9BB3B8]'}`}></span>
      </div>
      <span className="text-[#EAF6F7] font-medium">{freshness}</span>
      <span className="text-[#24404A]">|</span>
      <span className="inline-flex items-center space-x-1 text-[#9BB3B8]">
        <Activity className="w-3 h-3 text-[#39D6D0]" />
        <span>{sourceCount} validated sources</span>
      </span>
    </div>
  );
};
