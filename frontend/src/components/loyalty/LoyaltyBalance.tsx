'use client';

import React from 'react';
import { Award, TrendingUp } from 'lucide-react';

interface LoyaltyBalanceProps {
  balance: number;
}

export const LoyaltyBalance: React.FC<LoyaltyBalanceProps> = ({ balance }) => {
  return (
    <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-lg border border-teal-800 flex flex-col md:flex-row items-center md:justify-between gap-6 relative overflow-hidden">
      
      {/* Decorative background shape */}
      <div className="absolute right-[-40px] top-[-40px] w-48 h-48 rounded-full bg-teal-600/10 pointer-events-none" />

      <div className="flex items-center gap-4 z-10">
        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs text-white">
          <Award className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-teal-100 uppercase tracking-wider">Seu Saldo BioSaúde Cashback</h2>
          <span className="text-3xl md:text-4xl font-black">R$ {balance.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/5 md:max-w-xs w-full z-10 text-center md:text-left">
        <span className="text-[10px] font-bold text-teal-200 uppercase flex items-center justify-center md:justify-start gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> Ganhe Sempre
        </span>
        <p className="text-xs text-teal-50">
          Você ganha 5% do valor da sua compra em créditos em cada pedido! Use para descontar no próximo checkout.
        </p>
      </div>

    </div>
  );
};

export default LoyaltyBalance;
