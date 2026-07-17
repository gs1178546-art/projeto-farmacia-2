'use client';

import React from 'react';
import { Check, Truck, Home, Hourglass, Box } from 'lucide-react';
import { OrderStatus } from '../../types/order';

interface OrderTrackerProps {
  status: OrderStatus;
  estimatedTime?: number;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ status, estimatedTime }) => {
  const steps: { label: string; key: OrderStatus; icon: React.ReactNode }[] = [
    { label: 'Pendente', key: 'pending', icon: <Hourglass className="w-5 h-5" /> },
    { label: 'Aceito', key: 'accepted', icon: <Check className="w-5 h-5" /> },
    { label: 'Preparando', key: 'preparing', icon: <Box className="w-5 h-5" /> },
    { label: 'Saiu p/ Entrega', key: 'shipped', icon: <Truck className="w-5 h-5" /> },
    { label: 'Entregue', key: 'delivered', icon: <Home className="w-5 h-5" /> }
  ];

  const getStatusIndex = (s: OrderStatus) => {
    if (s === 'cancelled') return -1;
    const idx = steps.findIndex((step) => step.key === s);
    return idx;
  };

  const currentIndex = getStatusIndex(status);

  if (status === 'cancelled') {
    return (
      <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-center flex flex-col gap-1.5">
        <span className="text-red-750 font-bold text-sm">Pedido Cancelado</span>
        <p className="text-xs text-red-600">Este pedido foi cancelado e não está mais sendo processado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Time estimative banner */}
      {estimatedTime && currentIndex < 4 && (
        <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl text-center">
          <span className="text-xs font-semibold text-slate-500 block">Tempo estimado de entrega</span>
          <span className="text-2xl font-black text-teal-800 mt-1 block">{estimatedTime} minutos</span>
        </div>
      )}

      {/* Tracker Steps list */}
      <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-2">
        {/* Line Background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0 hidden md:block" />

        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div 
              key={step.key} 
              className="flex md:flex-col items-center gap-4 md:gap-2.5 z-10 flex-1 text-center"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                  isCurrent 
                    ? 'bg-teal-700 text-white border-teal-700 ring-4 ring-teal-100'
                    : isCompleted
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-400 border-slate-200'
                }`}
              >
                {step.icon}
              </div>
              <div className="flex flex-col text-left md:text-center">
                <span className={`text-xs font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="text-[9px] text-teal-700 font-bold uppercase tracking-wider mt-0.5 animate-pulse block">
                    Etapa Atual
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default OrderTracker;
