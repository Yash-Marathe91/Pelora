import React from 'react';
import { EvidenceItem } from '@/types/pelora';
import { Database, Satellite, Anchor, Activity, FileCheck } from 'lucide-react';
import { ConfidenceBadge } from '../ui/ConfidenceBadge';

interface EvidenceCardProps {
  evidence: EvidenceItem;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ evidence }) => {
  const Icon = {
    satellite: Satellite,
    buoy: Anchor,
    model: Activity,
    advisory: FileCheck,
    historical: Database,
  }[evidence.sourceType] || Database;

  return (
    <div className="p-3.5 rounded-xl bg-[#081C24] border border-[#24404A] hover:border-[#39D6D0]/40 transition-all space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#0B2630] text-[#39D6D0] border border-[#24404A]">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold font-manrope text-[#EAF6F7] line-clamp-1">
              {evidence.title}
            </h5>
            <span className="text-[11px] text-[#9BB3B8] font-data-label">
              {evidence.sourceName}
            </span>
          </div>
        </div>
        <ConfidenceBadge score={evidence.reliabilityScore} size="sm" showIcon={false} />
      </div>

      <p className="text-xs text-[#9BB3B8] leading-relaxed pt-1">
        {evidence.keyFinding}
      </p>

      <div className="flex items-center justify-between text-[11px] font-data-label text-[#9BB3B8] pt-1 border-t border-[#24404A]/50">
        <span>Freshness: <strong className="text-[#39D6D0] font-medium">{evidence.freshness}</strong></span>
        <span>{evidence.timestamp}</span>
      </div>
    </div>
  );
};
