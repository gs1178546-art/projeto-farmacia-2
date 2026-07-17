export type PromotionType = 'discount' | 'bogo' | 'cashback';

export interface Promotion {
  id: string;
  storeId: string;
  productId: string;
  type: PromotionType;
  value: number;       // % para discount, R$ para cashback
  valueTake?: number;  // bogo: leve X
  valuePay?: number;   // bogo: pague Y
  active: boolean;
  startsAt?: string;
  endsAt?: string;
  createdAt: string;
}
