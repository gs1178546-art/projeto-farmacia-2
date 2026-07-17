'use client';

import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useStoreConfigStore } from '../../store/storeConfigStore';

interface OrderSummaryProps {
  cashbackDiscountApplied: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cashbackDiscountApplied }) => {
  const { items, subtotal } = useCart();
  const { config } = useStoreConfigStore();

  const deliveryFee = config.deliveryFee;
  const total = Math.max(0, subtotal + deliveryFee - cashbackDiscountApplied);

  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 flex flex-col gap-4">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
        Resumo do Pedido
      </h3>

      {/* Items preview list */}
      <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug">
                {item.name}
              </span>
              <span className="text-[10px] text-slate-500">
                Qtd: {item.quantity} &times; R$ {item.price.toFixed(2)}
              </span>
            </div>
            <span className="text-xs font-extrabold text-slate-800">
              R$ {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Financial lines */}
      <div className="border-t border-slate-200/60 pt-3 flex flex-col gap-2 text-xs text-slate-650">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxa de Entrega</span>
          <span className="font-semibold text-slate-800">R$ {deliveryFee.toFixed(2)}</span>
        </div>
        {cashbackDiscountApplied > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Cashback Aplicado</span>
            <span>- R$ {cashbackDiscountApplied.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total line */}
      <div className="border-t border-slate-200 pt-2.5 flex justify-between items-end">
        <span className="text-sm font-bold text-slate-700">Total Geral</span>
        <span className="text-lg font-extrabold text-teal-805">R$ {total.toFixed(2)}</span>
      </div>

    </div>
  );
};

export default OrderSummary;
