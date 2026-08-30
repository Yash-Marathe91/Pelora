import React from 'react';
import { Users, MessageSquare, Share2, ShieldCheck, Send } from 'lucide-react';

export const CollaborationView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#75E6B5] mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>COLLABORATION & DISPATCH WORKSPACE</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Multi-Agency & Fleet Command Channel
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Real-time chat, shared map annotations, and joint decision brief dispatch between captains and operators.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#081C24] border border-[#24404A] space-y-4 shadow-xl">
        <h3 className="text-sm font-bold font-manrope text-[#EAF6F7]">Command Channel: Ratnagiri South Fleet Ops</h3>
        <div className="p-4 rounded-xl bg-[#06131A] border border-[#24404A] text-xs font-manrope text-[#9BB3B8] space-y-2">
          <p><strong className="text-[#39D6D0]">Captain Patel (Sea Explorer II):</strong> "Received Zone PFZ-AR-09 coordinates. Adjusting heading to 220°."</p>
          <p><strong className="text-[#75E6B5]">Disaster Command Center:</strong> "Squall advisory clear for next 8 hours. Good fishing."</p>
        </div>
      </div>
    </div>
  );
};
