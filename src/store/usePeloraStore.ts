import { create } from 'zustand';
import { PageId, PFZZone, Vessel, MarineAlert, AgentExecutionTelemetry } from '@/types/pelora';
import { MarineDataService } from '@/services/marineDataService';

interface PeloraState {
  activePage: PageId;
  previousPage: PageId | null;
  activePFZ: PFZZone | null;
  activeVessel: Vessel | null;
  alerts: MarineAlert[];
  isAskModalOpen: boolean;
  activeQuery: string;
  telemetryRun: AgentExecutionTelemetry | null;
  isSimulatingAgent: boolean;
  systemSettings: {
    safetyThresholdWaveMeters: number;
    satelliteRefreshMinutes: number;
    offlineSyncEnabled: boolean;
  };
  
  // Actions
  setActivePage: (page: PageId) => void;
  setActivePFZ: (pfz: PFZZone | null) => void;
  setActiveVessel: (vessel: Vessel | null) => void;
  toggleAskModal: (isOpen?: boolean) => void;
  runAIQuery: (queryText: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  setSystemSetting: (key: string, value: any) => void;
}

export const usePeloraStore = create<PeloraState>((set, get) => ({
  activePage: 'landing',
  previousPage: null,
  activePFZ: MarineDataService.getTopPFZones()[0],
  activeVessel: MarineDataService.getActiveVessels()[0],
  alerts: MarineDataService.getActiveAlerts(),
  isAskModalOpen: false,
  activeQuery: 'Is it safe to fish offshore Ratnagiri tomorrow morning?',
  telemetryRun: MarineDataService.simulateAgentExecution('Is it safe to fish offshore Ratnagiri tomorrow morning?'),
  isSimulatingAgent: false,
  systemSettings: {
    safetyThresholdWaveMeters: 1.5,
    satelliteRefreshMinutes: 15,
    offlineSyncEnabled: true,
  },

  setActivePage: (page: PageId) => {
    set((state) => ({
      previousPage: state.activePage,
      activePage: page,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setActivePFZ: (pfz: PFZZone | null) => set({ activePFZ: pfz }),

  setActiveVessel: (vessel: Vessel | null) => set({ activeVessel: vessel }),

  toggleAskModal: (isOpen?: boolean) => {
    set((state) => ({
      isAskModalOpen: isOpen !== undefined ? isOpen : !state.isAskModalOpen,
    }));
  },

  runAIQuery: (queryText: string) => {
    set({ isSimulatingAgent: true, activeQuery: queryText });
    setTimeout(() => {
      const telemetry = MarineDataService.simulateAgentExecution(queryText);
      set({
        telemetryRun: telemetry,
        isSimulatingAgent: false,
      });
    }, 800);
  },

  acknowledgeAlert: (alertId: string) => {
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, acknowledged: true } : a
      ),
    }));
  },

  setSystemSetting: (key: string, value: any) => {
    set((state) => ({
      systemSettings: {
        ...state.systemSettings,
        [key]: value,
      },
    }));
  },
}));
