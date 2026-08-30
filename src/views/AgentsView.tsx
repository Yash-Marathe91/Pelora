import React from 'react';
import { Cpu, Activity, Sparkles, CheckCircle2, Clock, Terminal } from 'lucide-react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { AgentTimeline } from '@/components/agents/AgentTimeline';

export const AgentsView: React.FC = () => {
  const { telemetryRun } = usePeloraStore();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#39D6D0] mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI AGENT OBSERVATORY & REASONING</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Multi-Agent Neural Network Telemetry
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Inspect step-by-step reasoning, tool execution, and debate logs across the agent swarm.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] shadow-xl">
        {telemetryRun && <AgentTimeline telemetry={telemetryRun} />}
      </div>
    </div>
  );
};
