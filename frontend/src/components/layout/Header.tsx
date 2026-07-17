'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useStoreConfigStore } from '../../store/storeConfigStore';
import Button from '../ui/Button';

interface HeaderProps {
  onCartOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { config } = useStoreConfigStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Mobile trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2 font-bold text-teal-800 text-lg">
              <span className="p-1.5 bg-teal-100 rounded-lg text-teal-700">🏥</span>
              <span>{config.branding.name}</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Buscar medicamentos, cosméticos e vitaminas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Admin shortcut */}
            <Link href="/admin" className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors">
              <ShieldCheck className="w-4 h-4" />
              Painel Admin
            </Link>

            {/* Loyalty/User Area */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/conta" 
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs uppercase">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs leading-none font-bold text-slate-800">{user?.name}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">R$ {user?.cashbackBalance.toFixed(2)} saldo</span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-red-500 hover:underline cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link href="/conta">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-1.5">
                  <User className="w-4 h-4" />
                  Entrar / Registrar
                </Button>
              </Link>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={onCartOpen}
              className="relative p-2.5 bg-teal-50 hover:bg-teal-100/80 rounded-xl text-teal-700 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3 flex">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="O que você está procurando hoje?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white py-4 px-4 flex flex-col gap-3 shadow-inner">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 py-1 hover:text-teal-700">
            Página Inicial
          </Link>
          <Link href="/conta" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 py-1 hover:text-teal-700">
            Minha Conta
          </Link>
          <Link href="/conta/pedidos" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 py-1 hover:text-teal-700">
            Meus Pedidos
          </Link>
          <Link href="/conta/fidelidade" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 py-1 hover:text-teal-700">
            Programa de Cashback
          </Link>
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-teal-700 py-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Painel Admin
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
