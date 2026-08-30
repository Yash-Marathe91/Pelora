'use client';

import React, { useState } from 'react';
import { usePeloraStore } from '@/store/usePeloraStore';
import { PeloraSidebar } from '@/components/navigation/PeloraSidebar';
import { PeloraTopbar } from '@/components/navigation/PeloraTopbar';
import { AskPeloraModal } from '@/components/ai/AskPeloraModal';
import { LandingView } from '@/views/LandingView';
import { AuthView } from '@/views/AuthView';
import { AskPeloraView } from '@/views/AskPeloraView';
import { MapView } from '@/views/MapView';
import { FishingView } from '@/views/FishingView';
import { SafetyView } from '@/views/SafetyView';
import { RoutePlannerView } from '@/views/RoutePlannerView';
import { AnalyticsView } from '@/views/AnalyticsView';
import { EcosystemView } from '@/views/EcosystemView';
import { ResearchView } from '@/views/ResearchView';
import { ReportsView } from '@/views/ReportsView';
import { MissionsView } from '@/views/MissionsView';
import { AlertsView } from '@/views/AlertsView';
import { DataFeedsView } from '@/views/DataFeedsView';
import { AgentsView } from '@/views/AgentsView';
import { VesselsView } from '@/views/VesselsView';
import { HistoricalView } from '@/views/HistoricalView';
import { CollaborationView } from '@/views/CollaborationView';
import { SettingsView } from '@/views/SettingsView';
import { MobileView } from '@/views/MobileView';

export default function PeloraApp() {
  const { activePage } = usePeloraStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Standalone Public Starting Pages (Landing Page & Authentication)
  if (activePage === 'landing') {
    return <LandingView />;
  }

  if (activePage === 'auth') {
    return <AuthView />;
  }

  // 2. Operational Platform Workspace Layout (Sidebar + Topbar + Command Palette + Views)
  const renderPlatformView = () => {
    switch (activePage) {
      case 'ask':
        return <AskPeloraView />;
      case 'map':
        return <MapView />;
      case 'fishing':
        return <FishingView />;
      case 'safety':
        return <SafetyView />;
      case 'routes':
        return <RoutePlannerView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'ecosystem':
        return <EcosystemView />;
      case 'research':
        return <ResearchView />;
      case 'reports':
        return <ReportsView />;
      case 'missions':
        return <MissionsView />;
      case 'alerts':
        return <AlertsView />;
      case 'data':
        return <DataFeedsView />;
      case 'agents':
        return <AgentsView />;
      case 'vessels':
        return <VesselsView />;
      case 'historical':
        return <HistoricalView />;
      case 'collaboration':
        return <CollaborationView />;
      case 'settings':
        return <SettingsView />;
      case 'mobile':
        return <MobileView />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#06131A] text-[#EAF6F7] flex flex-col font-sans selection:bg-[#39D6D0] selection:text-[#06131A]">
      {/* Platform Responsive Sidebar Drawer */}
      <PeloraSidebar
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area (Responsive Padding) */}
      <div className="lg:pl-64 flex-1 flex flex-col transition-all duration-300 min-w-0">
        {/* Platform Topbar */}
        <PeloraTopbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Operational Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {renderPlatformView()}
        </main>
      </div>

      {/* Global Command Palette / Ask Pelora AI Modal */}
      <AskPeloraModal />
    </div>
  );
}
