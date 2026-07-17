export interface LoyaltyTransaction {
  id: string;
  customerId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  createdAt: string;
}

export interface LoyaltyConfig {
  cashbackPercentage: number; // Por exemplo: 5 significa 5% de cashback
  minRedeemAmount: number; // Valor mínimo em reais para poder resgatar
  validityDays: number; // Validade em dias do cashback acumulado
  active: boolean;
}
