import { create } from 'zustand';
import { StoreConfig } from '../types/store';
import { mockStoreConfig } from '../mocks/storeConfig';

interface StoreConfigState {
  config: StoreConfig;
  updateConfig: (config: Partial<StoreConfig>) => void;
  updateBranding: (branding: Partial<StoreConfig['branding']>) => void;
  updateAnvisa: (anvisa: Partial<StoreConfig['anvisa']>) => void;
}

export const useStoreConfigStore = create<StoreConfigState>((set) => ({
  config: mockStoreConfig,
  updateConfig: (newConfig) => set((state) => ({
    config: { ...state.config, ...newConfig }
  })),
  updateBranding: (newBranding) => set((state) => ({
    config: {
      ...state.config,
      branding: { ...state.config.branding, ...newBranding }
    }
  })),
  updateAnvisa: (newAnvisa) => set((state) => ({
    config: {
      ...state.config,
      anvisa: { ...state.config.anvisa, ...newAnvisa }
    }
  }))
}));
