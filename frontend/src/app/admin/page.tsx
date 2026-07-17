'use client';

import React from 'react';
import { DollarSign, ShoppingCart, Award, Users, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

export default function AdminDashboardPage() {
  const { orders } = useOrders();

  // Calcular métricas rápidas em cima de mockOrders
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const preparingCount = orders.filter((o) => o.status === 'preparing' || o.status === 'accepted').length;

  const metrics = [
    { title: 'Faturamento do Dia', value: `R$ ${totalRevenue.toFixed(2)}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-450' },
    { title: 'Total de Pedidos', value: String(orders.length), icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-teal-500/10 text-teal-450' },
    { title: 'Pedidos Pendentes', value: String(pendingCount), icon: <AlertCircle className="w-5 h-5" />, color: 'bg-amber-500/10 text-amber-450' },
    { title: 'Em Preparação', value: String(preparingCount), icon: <ArrowUpRight className="w-5 h-5" />, color: 'bg-sky-500/10 text-sky-450' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header Dashboard */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard do Administrador</h1>
        <p className="text-xs text-slate-400">Dados do dia e visão geral da sua rede de farmácias multi-tenant.</p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-xs">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">{m.title}</span>
              <span className="text-2xl font-black text-white mt-1">{m.value}</span>
            </div>
            <div className={`p-3.5 rounded-xl ${m.color}`}>
              {m.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Quick overview section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Atividade Recente</h3>
        
        <div className="flex flex-col gap-3">
          {orders.slice(0, 3).map((order) => (
            <div 
              key={order.id}
              className="flex justify-between items-center p-4 border border-slate-800/80 rounded-xl bg-slate-950/20 text-xs text-slate-300"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-white">{order.id} - {order.customerName}</span>
                <span className="text-[10px] text-slate-500">
                  {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} &bull; {order.items.length} itens
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-teal-400">R$ {order.total.toFixed(2)}</span>
                <span className={`px-2 py-0.5 rounded-[5px] text-[9px] font-bold ${
                  order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
