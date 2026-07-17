'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useStoreConfigStore } from '../../store/storeConfigStore';
import Button from '../ui/Button';

export const CartSummary: React.FC = () => {
  const { subtotal, hasPrescriptionItems } = useCart();
  const { config } = useStoreConfigStore();

  const deliveryFee = config.deliveryFee;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col gap-3">
      
      {/* Subtotal lines */}
      <div className="flex flex-col gap-1.5 text-xs text-slate-650">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxa de Entrega</span>
          <span className="font-semibold text-slate-800">R$ {deliveryFee.toFixed(2)}</span>
        </div>
        
        {hasPrescriptionItems && (
          <div className="mt-1 flex items-start gap-1.5 bg-amber-50 border border-amber-100 p-2 rounded-lg text-[10px] text-amber-800">
            <span className="shrink-0 text-xs">⚠️</span>
            <p>Contém medicamento controlado. Você precisará apresentar a receita original ao entregador.</p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200/60 pt-2 flex justify-between items-end">
        <span className="text-sm font-bold text-slate-700">Total</span>
        <span className="text-lg font-extrabold text-teal-800">R$ {total.toFixed(2)}</span>
      </div>

      <Link href="/checkout" className="w-full mt-2">
        <Button className="w-full gap-2 rounded-xl">
          Finalizar Pedido
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
      
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold mt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        Compra 100% segura via Mercado Pago
      </div>

    </div>
  );
};

export default CartSummary;
