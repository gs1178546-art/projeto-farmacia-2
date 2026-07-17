import api from './api';
import { LoyaltyConfig, LoyaltyTransaction } from '../types/loyalty';
import { mockLoyaltyConfig } from '../mocks/loyaltyConfig';
import { delay } from '../lib/utils';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

let currentLoyaltyConfig = { ...mockLoyaltyConfig };
let mockTransactions: LoyaltyTransaction[] = [
  {
    id: 'tx-1',
    customerId: 'cust-1',
    type: 'credit',
    amount: 15.20,
    description: 'Cashback acumulado no pedido PED-9012',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx-2',
    customerId: 'cust-1',
    type: 'debit',
    amount: 5.00,
    description: 'Resgate de cashback no pedido PED-9831',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  }
];

export async function getLoyaltyConfig(): Promise<LoyaltyConfig> {
  if (USE_MOCK) {
    await delay(200);
    return currentLoyaltyConfig;
  }
  const { data } = await api.get('/loyalty/config');
  return data;
}

export async function updateLoyaltyConfig(config: Partial<LoyaltyConfig>): Promise<LoyaltyConfig> {
  if (USE_MOCK) {
    await delay(300);
    currentLoyaltyConfig = { ...currentLoyaltyConfig, ...config };
    return currentLoyaltyConfig;
  }
  const { data } = await api.put('/loyalty/config', config);
  return data;
}

export async function getLoyaltyTransactions(customerId: string): Promise<LoyaltyTransaction[]> {
  if (USE_MOCK) {
    await delay(250);
    return mockTransactions.filter((tx) => tx.customerId === customerId);
  }
  const { data } = await api.get(`/loyalty/transactions/${customerId}`);
  return data;
}

export async function addLoyaltyTransaction(tx: Omit<LoyaltyTransaction, 'id' | 'createdAt'>): Promise<LoyaltyTransaction> {
  if (USE_MOCK) {
    await delay(200);
    const newTx: LoyaltyTransaction = {
      ...tx,
      id: `tx-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    mockTransactions.unshift(newTx);
    return newTx;
  }
  const { data } = await api.post('/loyalty/transactions', tx);
  return data;
}
