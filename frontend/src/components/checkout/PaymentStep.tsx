'use client';

import React from 'react';
import { CreditCard, Landmark, DollarSign } from 'lucide-react';

export type PaymentMethodType = 'mercado_pago' | 'cash' | 'card_on_delivery';

interface PaymentStepProps {
  selectedMethod: PaymentMethodType;
  onChangeMethod: (method: PaymentMethodType) => void;
  onBack: () => void;
  onConfirm: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedMethod,
  onChangeMethod,
  onBack,
  onConfirm
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
        💳 Forma de Pagamento
      </h3>

      <div className="flex flex-col gap-3">
        {/* Mercado Pago */}
        <button
          onClick={() => onChangeMethod('mercado_pago')}
          className={`flex items-start gap-4 p-4 border rounded-2xl text-left transition-all cursor-pointer ${
            selectedMethod === 'mercado_pago'
              ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="p-2 bg-sky-100 text-sky-700 rounded-xl mt-0.5">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              Mercado Pago (Pix ou Cartão)
              <span className="px-1.5 py-0.5 bg-sky-100 text-sky-700 rounded text-[9px] font-bold">Online</span>
            </span>
            <p className="text-[10px] text-slate-500">Pague online com Pix para liberação instantânea ou use cartão de crédito.</p>
          </div>
        </button>

        {/* Card on Delivery */}
        <button
          onClick={() => onChangeMethod('card_on_delivery')}
          className={`flex items-start gap-4 p-4 border rounded-2xl text-left transition-all cursor-pointer ${
            selectedMethod === 'card_on_delivery'
              ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="p-2 bg-slate-100 text-slate-700 rounded-xl mt-0.5">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-slate-800">Pagar na Entrega (Cartão)</span>
            <p className="text-[10px] text-slate-500">O entregador levará a maquininha. Aceitamos crédito e débito.</p>
          </div>
        </button>

        {/* Cash */}
        <button
          onClick={() => onChangeMethod('cash')}
          className={`flex items-start gap-4 p-4 border rounded-2xl text-left transition-all cursor-pointer ${
            selectedMethod === 'cash'
              ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl mt-0.5">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-slate-800">Pagar na Entrega (Dinheiro)</span>
            <p className="text-[10px] text-slate-500">Pague em dinheiro ao entregador. Leve o valor exato ou solicite troco.</p>
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 mt-2">
        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-slate-700 hover:underline cursor-pointer"
        >
          Voltar para Endereço
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Confirmar e Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
