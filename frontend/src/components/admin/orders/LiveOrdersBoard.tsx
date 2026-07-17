'use client';

import React from 'react';
import { Order, OrderStatus } from '../../../types/order';
import NewOrderCard from './NewOrderCard';
import OrderDetailModal from './OrderDetailModal';
import { useOrders } from '../../../hooks/useOrders';

export const LiveOrdersBoard: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const columns: { title: string; status: OrderStatus; bg: string }[] = [
    { title: 'Pendentes / Novos', status: 'pending', bg: 'bg-amber-50/70 border-amber-100' },
    { title: 'Preparando', status: 'preparing', bg: 'bg-teal-50/50 border-teal-100' },
    { title: 'Em trânsito', status: 'shipped', bg: 'bg-sky-50/50 border-sky-100' },
    { title: 'Entregues', status: 'delivered', bg: 'bg-slate-50 border-slate-100' }
  ];

  const getOrdersByStatus = (status: OrderStatus) => {
    // Para simplificar, a coluna aceito ('accepted') cai junto com preparing para fins visuais no painel estilo iFood
    if (status === 'preparing') {
      return orders.filter((o) => o.status === 'preparing' || o.status === 'accepted');
    }
    return orders.filter((o) => o.status === status);
  };

  const handleNextStatus = async (order: Order) => {
    const statusFlow: Record<OrderStatus, OrderStatus> = {
      pending: 'accepted', // Passa pra aceito, que visualmente vai pra preparando
      accepted: 'preparing',
      preparing: 'shipped',
      shipped: 'delivered',
      delivered: 'delivered',
      cancelled: 'cancelled'
    };
    
    let next = statusFlow[order.status];
    if (order.status === 'accepted') next = 'preparing';
    if (order.status === 'pending') next = 'preparing'; // Pula direto para preparando para acelerar fluxo mock

    await updateOrderStatus(order.id, next);
  };

  const handleCancelOrder = async (order: Order) => {
    await updateOrderStatus(order.id, 'cancelled');
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-800">Gestão de Pedidos ao Vivo</h2>
          <p className="text-xs text-slate-500">Monitore, aceite e alterne status de pedidos em tempo real (Painel iFood).</p>
        </div>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 items-start min-h-[500px]">
        {columns.map((col) => {
          const colOrders = getOrdersByStatus(col.status);

          return (
            <div 
              key={col.status}
              className={`flex flex-col gap-3 p-4 border rounded-2xl ${col.bg} h-full min-h-[420px]`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-800">{col.title}</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200/60 rounded-full text-[10px] font-bold text-slate-700">
                  {colOrders.length}
                </span>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto max-h-[580px] pr-1">
                {colOrders.map((order) => (
                  <NewOrderCard
                    key={order.id}
                    order={order}
                    onClick={() => setSelectedOrder(order)}
                    onAccept={() => handleNextStatus(order)}
                    onReject={() => handleCancelOrder(order)}
                    nextActionLabel={
                      order.status === 'pending'
                        ? 'Aceitar'
                        : order.status === 'preparing' || order.status === 'accepted'
                        ? 'Enviar p/ Entrega'
                        : order.status === 'shipped'
                        ? 'Marcar Entregue'
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Details modal overlay */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={true}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}

    </div>
  );
};

export default LiveOrdersBoard;
