import React from 'react';
import { FileText, Download, Share2, Sparkles, CheckCircle2, Calendar } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { FreshnessIndicator } from '@/components/ui/FreshnessIndicator';

export const ReportsView: React.FC = () => {
  const reports = [
    { title: 'Weekly Arabian Sea Hydrographic & PFZ Yield Summary', date: '2026-08-30', pages: '14 Pages', confidence: 96, category: 'Executive Brief' },
    { title: 'Ratnagiri South Sector Monsoon Transition Risk Analysis', date: '2026-08-28', pages: '8 Pages', confidence: 91, category: 'Safety Advisory' },
    { title: 'Angria Bank Thermal Front & Bleaching Resilience Assessment', date: '2026-08-24', pages: '22 Pages', confidence: 94, category: 'Ecosystem' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#39D6D0] mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>INTELLIGENCE BRIEFS & REPORTS</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Synthesized Decision Briefs & PDFs
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Automated AI agent report synthesis with evidence citations and verifiable data provenance.
          </p>
        </div>
        <FreshnessIndicator freshness="INCOIS & Pelora AI Generated" sourceCount={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((r, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] hover:border-[#39D6D0]/40 transition-all space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-data-label uppercase text-[#39D6D0]">{r.category}</span>
              <ConfidenceBadge score={r.confidence} size="sm" />
            </div>

            <h3 className="text-base font-bold font-manrope text-[#EAF6F7] leading-snug">{r.title}</h3>

            <div className="text-xs text-[#9BB3B8] font-data-label flex items-center justify-between pt-2 border-t border-[#24404A]/60">
              <span>{r.date} • {r.pages}</span>
              <button className="p-2 rounded-lg bg-[#0B2630] border border-[#39D6D0]/40 text-[#39D6D0] hover:bg-[#0E4350] transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
