export interface CartItem {
  productId: string;
  name: string;
  image: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  priceOriginal?: number;
  discount?: number;
  leve3Pague2?: boolean;
  promoType?: 'discount' | 'bogo' | 'cashback';
  promoBadge?: string;
}
