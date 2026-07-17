import { Promotion } from '@/types/promotion';

export const mockPromotions: Promotion[] = [
  {
    id: 'promo_1',
    storeId: 'store_1',
    productId: '5',
    type: 'bogo',
    value: 0,
    valueTake: 3,
    valuePay: 2,
    active: true,
    createdAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'promo_2',
    storeId: 'store_1',
    productId: '1',
    type: 'discount',
    value: 20,
    active: true,
    createdAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'promo_3',
    storeId: 'store_1',
    productId: '4',
    type: 'discount',
    value: 15,
    active: true,
    createdAt: '2026-07-05T10:00:00Z',
  },
  {
    id: 'promo_4',
    storeId: 'store_1',
    productId: '7',
    type: 'discount',
    value: 20,
    active: true,
    createdAt: '2026-07-10T10:00:00Z',
  },
];
