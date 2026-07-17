import api from './api';
import { StoreConfig } from '../types/store';
import { mockStoreConfig } from '../mocks/storeConfig';
import { delay } from '../lib/utils';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

let localStoreConfig = { ...mockStoreConfig };

export async function getStoreConfig(): Promise<StoreConfig> {
  if (USE_MOCK) {
    await delay(200);
    return localStoreConfig;
  }
  const { data } = await api.get('/store/config');
  return data;
}

export async function updateStoreConfig(config: Partial<StoreConfig>): Promise<StoreConfig> {
  if (USE_MOCK) {
    await delay(300);
    localStoreConfig = {
      ...localStoreConfig,
      ...config,
      branding: {
        ...localStoreConfig.branding,
        ...(config.branding || {})
      },
      anvisa: {
        ...localStoreConfig.anvisa,
        ...(config.anvisa || {})
      }
    };
    return localStoreConfig;
  }
  const { data } = await api.put('/store/config', config);
  return data;
}
