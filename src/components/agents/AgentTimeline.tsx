import React from 'react';
import { AgentExecutionTelemetry } from '@/types/pelora';
import { Bot, CheckCircle2, Clock, Cpu, ShieldCheck } from 'lucide-react';

interface AgentTimelineProps {
  telemetry: AgentExecutionTelemetry;
  compact?: boolean;
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({
  telemetry,
  compact = false,
}) => {
  return (
    <div className="bg-[#081C24] p-4 rounded-xl border border-[#24404A] space-y-4">
      <div className="flex items-center justify-between border-b border-[#24404A] pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-[#39D6D0]/10 text-[#39D6D0]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-manrope text-[#EAF6F7]">
              Multi-Agent Intelligence Network
            </h4>
            <p className="text-xs text-[#9BB3B8] font-data-label">
              4 Collaborative AI Agents Executed in {telemetry.totalDurationMs}ms
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#75E6B5] bg-[#75E6B5]/10 px-2.5 py-1 rounded-full border border-[#75E6B5]/30 font-data-label font-medium inline-flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Telemetry</span>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {telemetry.steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3 rounded-lg bg-[#0B2630]/60 border border-[#24404A]/60 hover:border-[#39D6D0]/30 transition-colors"
          >
            <div className="mt-0.5 p-1 rounded bg-[#39D6D0]/10 text-[#39D6D0]">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#EAF6F7] font-manrope">
                  {step.agentName}
                </span>
                <span className="text-[11px] font-mono-code text-[#9BB3B8]">
                  {step.durationMs}ms
                </span>
              </div>
              <span className="text-[11px] text-[#39D6D0] font-data-label font-medium block mt-0.5">
                Role: {step.agentRole}
              </span>
              <p className="text-xs text-[#9BB3B8] mt-1 line-clamp-2">
                {step.task}
              </p>
              {!compact && (
                <div className="mt-2 p-2 rounded bg-[#06131A] text-[11px] font-mono-code text-[#75E6B5] border border-[#24404A]">
                  <span className="text-[#9BB3B8] font-bold">Tool [{step.toolUsed}]: </span>
                  {step.outputSnippet}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
