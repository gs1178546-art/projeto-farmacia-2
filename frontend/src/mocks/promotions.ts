import { Promotion } from '../types/promotion';

export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    name: 'Festival de Inverno',
    description: 'Desconto em medicamentos selecionados para gripes e resfriados.',
    type: 'discount',
    value: 15,
    active: true,
    applicableProductIds: ['prod-1', 'prod-4']
  },
  {
    id: 'promo-2',
    name: 'Cashback Turbinado Dermocosméticos',
    description: 'Ganhe 10% de cashback em qualquer protetor ou hidratante.',
    type: 'cashback_multiplier',
    value: 2, // Multiplicador de cashback normal (ex: 5% vira 10%)
    active: true,
    applicableProductIds: ['prod-3']
  }
];
