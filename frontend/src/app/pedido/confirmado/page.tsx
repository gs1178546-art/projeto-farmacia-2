'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

function ConfirmadoContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || 'PED-XXXX';

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xs text-center flex flex-col items-center gap-6 max-w-xl mx-auto w-full">
      <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 animate-bounce">
        <CheckCircle className="w-12 h-12" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-black text-slate-800">Pedido Realizado com Sucesso!</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Seu pedido foi registrado no sistema e já foi encaminhado para a farmácia parceira.
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl w-full border border-slate-150 flex flex-col gap-1 text-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Código do Pedido</span>
        <span className="text-lg font-black text-slate-850">{orderId}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
        <Link href={`/pedido/${orderId}`} className="flex-1">
          <Button className="w-full gap-2 rounded-xl py-3 justify-center">
            Acompanhar Entrega
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full rounded-xl py-3 justify-center">
            Continuar Comprando
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={
      <div className="w-full py-24 flex items-center justify-center">
        <span>Carregando confirmação...</span>
      </div>
    }>
      <ConfirmadoContent />
    </Suspense>
  );
}
