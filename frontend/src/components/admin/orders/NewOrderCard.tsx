'use client';

import React from 'react';
import { ShoppingBag, ArrowRight, ShieldAlert, Phone } from 'lucide-react';
import { Order } from '../../../types/order';

interface NewOrderCardProps {
  order: Order;
  onClick: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  nextActionLabel?: string;
}

export const NewOrderCard: React.FC<NewOrderCardProps> = ({
  order,
  onClick,
  onAccept,
  onReject,
  nextActionLabel
}) => {
  const containsControlled = order.items.some((item) => item.productId === 'prod-2'); // Ex: Amoxicilina
  const isPending = order.status === 'pending';

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-slate-150 rounded-xl p-4 flex flex-col gap-3 shadow-2xs hover:shadow-xs hover:border-slate-350 transition-all cursor-pointer relative"
    >
      
      {/* Head details */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
        <span className="text-xs font-bold text-slate-800">{order.id}</span>
        <span className="text-[10px] text-slate-400 font-semibold">
          {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Main info */}
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold text-slate-700 line-clamp-1">{order.customerName}</span>
        <span className="text-[10px] text-slate-550 flex items-center gap-1">
          <Phone className="w-3 h-3 text-slate-400" />
          {order.customerPhone}
        </span>
        <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
          {order.address.street}, {order.address.number}
        </span>
      </div>

      {/* Controlled warning badge */}
      {containsControlled && (
        <span className="px-2 py-0.5 bg-red-50 text-red-750 border border-red-100 rounded text-[9px] font-bold flex items-center gap-1 w-fit">
          <ShieldAlert className="w-3 h-3" /> Receita Obrigatória
        </span>
      )}

      {/* Action buttons (only in specific lanes) */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-50 pt-2.5" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase">Total</span>
          <span className="text-xs font-extrabold text-teal-800">R$ {order.total.toFixed(2)}</span>
        </div>
        
        {nextActionLabel && (
          <div className="flex gap-1">
            {isPending && onReject && (
              <button
                onClick={onReject}
                className="px-2 py-1 border border-red-200 hover:bg-red-50 text-red-600 text-[10px] font-bold rounded-lg cursor-pointer"
              >
                Recusar
              </button>
            )}
            {onAccept && (
              <button
                onClick={onAccept}
                className="px-2.5 py-1 bg-teal-700 hover:bg-teal-800 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                {nextActionLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default NewOrderCard;
