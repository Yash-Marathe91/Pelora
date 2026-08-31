import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { PageId } from '@/types/pelora';
import {
  Compass,
  Sparkles,
  Map as MapIcon,
  Fish,
  ShieldAlert,
  Navigation,
  BarChart3,
  Waves,
  Microscope,
  FileText,
  Anchor,
  Bell,
  Database,
  Cpu,
  Ship,
  History,
  Users,
  UserCheck,
  Settings,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Radio,
  Layers,
  X,
} from 'lucide-react';

interface NavGroup {
  category: string;
  items: {
    id: PageId;
    label: string;
    icon: React.ElementType;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    category: 'Core Workspaces',
    items: [
      { id: 'map', label: 'Ocean Intelligence Map', icon: MapIcon },
      { id: 'ask', label: 'Intelligence Command', icon: Compass },
      { id: 'missions', label: 'Mission Control', icon: Anchor },
    ],
  },
  {
    category: 'Fisheries & Operations',
    items: [
      { id: 'fishing', label: 'Fishing & PFZ Explorer', icon: Fish },
      { id: 'routes', label: 'Smart Route Planner', icon: Navigation },
      { id: 'vessels', label: 'Fleet & Vessel Matrix', icon: Ship },
    ],
  },
  {
    category: 'Safety & Hazard Center',
    items: [
      { id: 'safety', label: 'Safety & Risk Center', icon: ShieldAlert },
      { id: 'alerts', label: 'Emergency Alerts', icon: Bell },
    ],
  },
  {
    category: 'Analytics & Science',
    items: [
      { id: 'analytics', label: 'Hydrographic Analytics', icon: BarChart3 },
      { id: 'ecosystem', label: 'Ecosystem Health', icon: Waves },
      { id: 'research', label: 'Research Datasets', icon: Microscope },
      { id: 'reports', label: 'Decision Briefs', icon: FileText },
      { id: 'historical', label: 'Historical Replay', icon: History },
    ],
  },
  {
    category: 'Platform & Data',
    items: [
      { id: 'data', label: 'Data Feeds & Lineage', icon: Database },
      { id: 'agents', label: 'Agent Observatory', icon: Cpu },
      { id: 'collaboration', label: 'Collaboration Rooms', icon: Users },
      { id: 'settings', label: 'System Settings', icon: Settings },
      { id: 'mobile', label: 'Mobile PWA Companion', icon: Smartphone },
    ],
  },
];

interface PeloraSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const PeloraSidebar: React.FC<PeloraSidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { activePage, setActivePage } = usePeloraStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSelect = (pageId: PageId) => {
    setActivePage(pageId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#06131A]/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation Panel */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 bg-[#06131A] border-r border-[#24404A] transition-all duration-300 flex flex-col ${
          isOpenMobile ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#24404A] bg-[#081C24]/90">
          {(!isCollapsed || isOpenMobile) && (
            <div
              onClick={() => handleSelect('landing')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <img
                src="/logo.png"
                alt="Pelora Logo"
                className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-base font-extrabold tracking-wider font-manrope text-[#EAF6F7] group-hover:text-[#39D6D0] transition-colors">
                  PELORA
                </span>
                <span className="text-[10px] block font-data-label text-[#39D6D0] font-semibold tracking-widest uppercase">
                  ORCA PLATFORM
                </span>
              </div>
            </div>
          )}

          {isCollapsed && !isOpenMobile && (
            <div
              onClick={() => handleSelect('landing')}
              className="w-9 h-9 cursor-pointer mx-auto group"
            >
              <img
                src="/logo.png"
                alt="Pelora Logo"
                className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              />
            </div>
          )}

          <div className="flex items-center space-x-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 rounded-md hover:bg-[#0B2630] text-[#9BB3B8] hover:text-[#39D6D0] transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            {isOpenMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-md hover:bg-[#0B2630] text-[#9BB3B8] hover:text-[#39D6D0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Categorized Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {NAV_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {(!isCollapsed || isOpenMobile) && (
                <div className="px-3 text-[10px] font-extrabold text-[#39D6D0]/80 font-data-label tracking-widest uppercase mb-1.5">
                  {group.category}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium font-manrope transition-all group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-[#39D6D0]/20 to-[#0B2630] text-[#39D6D0] border-l-2 border-[#39D6D0] font-bold shadow-sm'
                        : 'text-[#9BB3B8] hover:bg-[#081C24] hover:text-[#EAF6F7]'
                    }`}
                    title={isCollapsed && !isOpenMobile ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-[#39D6D0]' : 'text-[#9BB3B8] group-hover:text-[#39D6D0]'
                      }`}
                    />
                    {(!isCollapsed || isOpenMobile) && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Live Status Footer */}
        <div className="p-3 border-t border-[#24404A] bg-[#081C24]/90">
          {(!isCollapsed || isOpenMobile) ? (
            <div className="flex items-center justify-between text-[11px] font-data-label text-[#9BB3B8]">
              <div className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-[#75E6B5] animate-pulse" />
                <span>Data Feeds: <strong className="text-[#75E6B5]">14 Active</strong></span>
              </div>
              <span className="text-[#39D6D0] font-mono-code">Live Grid</span>
            </div>
          ) : (
            <div className="flex justify-center" title="14 Active Data Feeds">
              <Radio className="w-4 h-4 text-[#75E6B5] animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
