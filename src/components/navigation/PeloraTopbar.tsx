import React from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { Sparkles, Search, Bell, MapPin, ShieldCheck, User, Menu } from 'lucide-react';
import { FreshnessIndicator } from '../ui/FreshnessIndicator';

interface PeloraTopbarProps {
  onOpenMobileMenu?: () => void;
}

export const PeloraTopbar: React.FC<PeloraTopbarProps> = ({ onOpenMobileMenu }) => {
  const { toggleAskModal, alerts, setActivePage } = usePeloraStore();
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <header className="h-16 bg-[#081C24]/90 backdrop-blur-md border-b border-[#24404A] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Mobile Menu Toggle & Sector */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg bg-[#06131A] border border-[#24404A] text-[#9BB3B8] hover:text-[#39D6D0] transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-2 bg-[#06131A] px-3 py-1.5 rounded-lg border border-[#24404A]">
          <MapPin className="w-4 h-4 text-[#39D6D0]" />
          <span className="text-xs font-semibold text-[#EAF6F7] font-manrope">
            Arabian Sea • Ratnagiri Sector
          </span>
        </div>

        <div className="hidden md:block">
          <FreshnessIndicator freshness="Updated 14m ago" sourceCount={4} />
        </div>
      </div>

      {/* Center Search / Command Palette Trigger */}
      <div className="flex-1 max-w-md md:max-w-xl mx-3 sm:mx-6">
        <button
          onClick={() => toggleAskModal(true)}
          className="w-full flex items-center justify-between bg-[#06131A]/90 hover:bg-[#06131A] border border-[#24404A] hover:border-[#39D6D0]/50 px-3.5 py-2 rounded-xl text-xs text-[#9BB3B8] transition-all group shadow-inner"
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <Search className="w-4 h-4 text-[#39D6D0] group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="font-manrope truncate">
              Search Pelora Intelligence Platform... <em className="not-italic text-[#39D6D0]/80 hidden sm:inline">"Ratnagiri Sector, PFZ-09, Route"</em>
            </span>
          </div>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono-code bg-[#0B2630] text-[#9BB3B8] rounded border border-[#24404A] flex-shrink-0">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Alerts Notification Button */}
        <button
          onClick={() => setActivePage('alerts')}
          className="relative p-2 rounded-lg bg-[#06131A] border border-[#24404A] hover:border-[#39D6D0]/40 text-[#9BB3B8] hover:text-[#EAF6F7] transition-colors"
          title="Active Alerts"
        >
          <Bell className="w-4 h-4" />
          {unacknowledgedAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F18A63] text-[#06131A] text-[10px] font-bold font-mono-code flex items-center justify-center animate-pulse">
              {unacknowledgedAlerts.length}
            </span>
          )}
        </button>

        {/* User Profile Pill */}
        <button
          onClick={() => setActivePage('auth')}
          className="flex items-center space-x-2 bg-[#06131A] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#24404A] hover:border-[#39D6D0]/50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-[#39D6D0]/20 text-[#39D6D0] flex items-center justify-center text-xs font-bold font-manrope">
            C
          </div>
          <div className="text-left hidden md:block">
            <span className="text-xs font-bold text-[#EAF6F7] block leading-none font-manrope">
              Capt. Devraj Singh
            </span>
            <span className="text-[10px] text-[#75E6B5] block leading-none font-data-label mt-0.5">
              Master Craftsman
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
