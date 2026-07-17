import { LoyaltyConfig } from '../types/loyalty';

export const mockLoyaltyConfig: LoyaltyConfig = {
  cashbackPercentage: 5, // 5% de cashback padrão
  minRedeemAmount: 10,  // Mínimo de R$ 10,00 acumulados para resgatar
  validityDays: 180,     // Validade de 6 meses
  active: true
};
