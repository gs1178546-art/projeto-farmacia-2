'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Order } from '../../types/order';
import OrderStatusBadge from './OrderStatusBadge';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xs hover:border-slate-200 transition-all flex flex-col gap-4">
      
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-50 pb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-slate-800">{order.id}</span>
          <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items short preview list */}
      <div className="flex flex-col gap-1.5">
        {order.items.map((item, i) => (
          <div key={i} className="text-xs text-slate-650 flex justify-between">
            <span className="line-clamp-1">{item.name} <strong className="text-slate-500 font-medium">({item.quantity}x)</strong></span>
            <span className="font-semibold text-slate-800 shrink-0">R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Footer Details Link and price */}
      <div className="border-t border-slate-50 pt-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Valor Pago</span>
          <span className="text-sm font-extrabold text-teal-800">R$ {order.total.toFixed(2)}</span>
        </div>
        <Link 
          href={`/pedido/${order.id}`}
          className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:underline"
        >
          Acompanhar Pedido
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default OrderCard;
