import React, { useState } from 'react';
import { History, Play, Pause, Calendar, Clock, RotateCcw } from 'lucide-react';
import { MapShell } from '@/components/maps/MapShell';

export const HistoricalView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#24404A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-data-label text-[#F4C95D] mb-1">
            <History className="w-3.5 h-3.5" />
            <span>HISTORICAL OCEAN REPLAY</span>
          </div>
          <h1 className="text-3xl font-extrabold font-manrope text-[#EAF6F7]">
            Historical Satellite & Track Playback
          </h1>
          <p className="text-sm text-[#9BB3B8] font-body mt-1">
            Replay thermal front migrations, monsoon wind shifts, and vessel movement logs over any past date.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-[#39D6D0] text-[#06131A] font-extrabold text-xs font-manrope rounded-xl hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Replay' : 'Start Playback'}</span>
          </button>
        </div>
      </div>

      <div className="h-[460px] rounded-2xl overflow-hidden border border-[#24404A] shadow-2xl">
        <MapShell height="100%" showControls={true} />
      </div>
    </div>
  );
};
