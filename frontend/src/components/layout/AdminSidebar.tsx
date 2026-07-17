'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Percent,
  Award,
  Users,
  Settings,
  ArrowLeft,
  Anvil
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Pedidos ao Vivo', path: '/admin/pedidos', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Produtos (CRUD)', path: '/admin/produtos', icon: <Package className="w-5 h-5" /> },
    { name: 'Banners Carrossel', path: '/admin/carrossel', icon: <Layers className="w-5 h-5" /> },
    { name: 'Promoções', path: '/admin/promocoes', icon: <Percent className="w-5 h-5" /> },
    { name: 'Programa Fidelidade', path: '/admin/fidelidade', icon: <Award className="w-5 h-5" /> },
    { name: 'Clientes & CRM', path: '/admin/clientes', icon: <Users className="w-5 h-5" /> },
    { name: 'Configurações', path: '/admin/configuracoes', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen sticky top-0">
      
      {/* Header Admin */}
      <div className="p-6 border-b border-slate-850 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-white font-bold text-base flex items-center gap-1.5">
            <span>🛡️</span> Admin Panel
          </span>
          <span className="text-[10px] text-slate-500 font-medium">BioSaúde White-Label</span>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Back to Store */}
      <div className="p-4 border-t border-slate-850 bg-slate-950">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Loja
        </Link>
      </div>

    </aside>
  );
};

export default AdminSidebar;
