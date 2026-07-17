export type LoyaltyTransactionType = 'EARNED' | 'REDEEMED' | 'EXPIRED' | 'ADJUSTED';

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  storeId: string;
  type: LoyaltyTransactionType;
  amount: number;
  orderId?: string;
  description: string;
  expiresAt?: string;
  createdAt: string;
}

export interface LoyaltyAccount {
  userId: string;
  storeId: string;
  balance: number;
  totalEarned: number;
  totalRedeemed: number;
  transactions: LoyaltyTransaction[];
}

export interface LoyaltyConfig {
  storeId: string;
  enabled: boolean;
  cashbackPercent: number;     // % do valor da compra que vira cashback
  minOrderToEarn: number;      // valor mínimo do pedido para ganhar cashback
  minBalanceToRedeem: number;  // saldo mínimo para poder usar
  maxRedeemPercent: number;    // máx % do pedido que pode ser pago com cashback
  validityDays: number;        // dias até o cashback expirar
}
