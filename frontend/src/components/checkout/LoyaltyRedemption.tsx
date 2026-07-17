'use client';

import React, { useState } from 'react';
import { Award, Check, HelpCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLoyalty } from '../../hooks/useLoyalty';
import Button from '../ui/Button';

interface LoyaltyRedemptionProps {
  onApplyCashback: (amount: number) => void;
  appliedAmount: number;
  orderSubtotal: number;
}

export const LoyaltyRedemption: React.FC<LoyaltyRedemptionProps> = ({
  onApplyCashback,
  appliedAmount,
  orderSubtotal
}) => {
  const { user } = useAuth();
  const { config } = useLoyalty();
  const [useCashback, setUseCashback] = useState(false);

  if (!user || user.cashbackBalance <= 0) return null;

  const minAmount = config?.minRedeemAmount || 10;
  const isEligible = user.cashbackBalance >= minAmount;

  const handleToggle = () => {
    if (!useCashback) {
      // Aplica o cashback até o limite do subtotal da compra
      const redemptionValue = Math.min(user.cashbackBalance, orderSubtotal);
      onApplyCashback(redemptionValue);
      setUseCashback(true);
    } else {
      onApplyCashback(0);
      setUseCashback(false);
    }
  };

  return (
    <div className="p-4 border border-slate-100 rounded-2xl bg-white flex flex-col gap-3 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700">
          <Award className="w-5 h-5" />
        </div>
        <div className="flex-1 flex flex-col gap-0.5">
          <span className="text-xs font-bold text-slate-800">Saldo de Cashback BioSaúde</span>
          <span className="text-sm font-extrabold text-emerald-600">R$ {user.cashbackBalance.toFixed(2)} acumulados</span>
        </div>
      </div>

      <div className="border-t border-slate-50 pt-2.5 flex items-center justify-between gap-4">
        {isEligible ? (
          <>
            <p className="text-[10px] text-slate-500 max-w-[220px]">
              Deseja usar seus créditos para pagar parte deste pedido?
            </p>
            <Button
              onClick={handleToggle}
              variant={useCashback ? 'primary' : 'outline'}
              size="sm"
              className="rounded-xl gap-1 shrink-0 text-xs py-1.5"
            >
              {useCashback ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Aplicado (R$ {appliedAmount.toFixed(2)})
                </>
              ) : (
                'Resgatar Saldo'
              )}
            </Button>
          </>
        ) : (
          <div className="flex items-start gap-1.5 text-[10px] text-slate-400">
            <HelpCircle className="w-4 h-4 shrink-0 text-slate-350 mt-0.5" />
            <p>Você precisa de no mínimo R$ {minAmount.toFixed(2)} em créditos de cashback para realizar um resgate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyRedemption;
