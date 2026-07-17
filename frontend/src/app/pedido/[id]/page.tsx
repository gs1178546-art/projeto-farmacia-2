'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, CreditCard, ShieldAlert } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { useSocket } from '../../hooks/useSocket';
import { Order } from '../../types/order';
import OrderTracker from '../../components/orders/OrderTracker';
import OrderStatusBadge from '../../components/orders/OrderStatusBadge';
import Spinner from '../../components/ui/Spinner';

interface OrderTrackingPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const { id } = use(params);
  const { fetchOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Hook do Socket.io para escutar mudanças no status do pedido e atualizar dinamicamente a tela
  useSocket(id, (nextStatus) => {
    if (order) {
      setOrder({ ...order, status: nextStatus, updatedAt: new Date().toISOString() });
    }
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchOrderById(id);
        setOrder(res);
      } catch (e) {
        console.error('Error fetching order', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full py-16 text-center flex flex-col gap-4 items-center">
        <span className="text-slate-400 font-bold text-sm">Pedido não encontrado</span>
        <Link href="/">
          <button className="px-4 py-2 bg-teal-700 text-white rounded-lg text-xs font-bold cursor-pointer">
            Voltar para Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      
      {/* Back link */}
      <div>
        <Link href="/conta/pedidos" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Meus Pedidos
        </Link>
      </div>

      {/* Main card Tracker */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-50 pb-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-slate-400 font-semibold uppercase">Acompanhamento do Pedido</span>
            <h1 className="text-lg font-black text-slate-800">{order.id}</h1>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Dynamic Stepper */}
        <OrderTracker status={order.status} estimatedTime={order.estimatedTime} />
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: summary address & payment */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Dados de Entrega</h3>
          
          <div className="text-xs flex flex-col gap-3 text-slate-600">
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Endereço:</span>
                <p className="mt-1 leading-normal">
                  {order.address.street}, nº {order.address.number} {order.address.complement && `(${order.address.complement})`}<br />
                  {order.address.neighborhood} - {order.address.city} / {order.address.state}<br />
                  CEP: {order.address.zipCode}
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start border-t border-slate-100 pt-3">
              <CreditCard className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Método de Pagamento:</span>
                <p className="mt-1">
                  {order.paymentMethod === 'mercado_pago' 
                    ? 'Mercado Pago (Pix / Crédito)' 
                    : order.paymentMethod === 'card_on_delivery' 
                    ? 'Pagar na Entrega (Cartão)' 
                    : 'Pagar na Entrega (Dinheiro)'}
                </p>
                <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold mt-1 ${
                  order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {order.paymentStatus === 'paid' ? 'Pago' : 'Aguardando Pagamento'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: items summary list */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Resumo do Pedido</h3>
          
          <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-650">
                <span className="line-clamp-1">{item.name} <strong className="text-slate-405 font-semibold">({item.quantity}x)</strong></span>
                <span className="font-bold text-slate-800">R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">R$ {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Entrega</span>
              <span className="font-semibold text-slate-800">R$ {order.deliveryFee.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Desconto Cashback</span>
                <span>- R$ {order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-extrabold text-teal-800">
              <span>Total Pago</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
