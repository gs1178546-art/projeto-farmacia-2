export type PromotionType = 'discount' | 'bogo' | 'cashback_multiplier';

export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: PromotionType;
  value: number; // Porcentagem de desconto, quantidade BOGO ou multiplicador
  active: boolean;
  startDate?: string;
  endDate?: string;
  applicableProductIds?: string[]; // Se vazio, aplica-se a toda a loja
}
