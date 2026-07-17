'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../types/order';
import OrderCard from '../../components/orders/OrderCard';
import Spinner from '../../components/ui/Spinner';

export default function AccountOrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const { orders, fetchOrders } = useOrders();
  const [loading, setLoading] = useState(false);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      try {
        await fetchOrders();
      } catch (e) {
        console.error('Error loading history', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  useEffect(() => {
    if (user) {
      setCustomerOrders(orders.filter((o) => o.customerId === user.id));
    }
  }, [orders, user]);

  if (!isAuthenticated) {
    return (
      <div className="py-16 text-center flex flex-col gap-4 items-center">
        <span className="text-slate-400 font-bold text-sm">Você precisa estar logado</span>
        <Link href="/conta">
          <button className="px-4 py-2 bg-teal-700 text-white rounded-lg text-xs font-bold cursor-pointer">
            Fazer Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div>
        <Link href="/conta" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Minha Conta
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-black text-slate-900">Histórico de Pedidos</h1>
        <p className="text-xs text-slate-500">Consulte o status e as informações detalhadas dos seus pedidos anteriores.</p>
      </div>

      {loading ? (
        <div className="w-full py-16 flex items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : customerOrders.length === 0 ? (
        <div className="py-16 text-center bg-white border border-dashed border-slate-200 rounded-3xl flex flex-col gap-3 items-center">
          <div className="p-3 bg-teal-50 rounded-full text-teal-700">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-slate-700">Nenhum pedido realizado</span>
          <Link href="/">
            <button className="px-4 py-2 bg-teal-700 text-white rounded-lg text-xs font-bold cursor-pointer">
              Ir para Loja
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {customerOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

    </div>
  );
}
