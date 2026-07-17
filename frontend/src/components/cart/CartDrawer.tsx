'use client';

import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import CartItemComponent from './CartItem';
import CartSummary from './CartSummary';
import Button from '../ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full border-l border-slate-100 animate-in slide-in-from-right duration-300">
          
          {/* Header Drawer */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-700" />
              Seu Carrinho
            </h2>
            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  title="Limpar Carrinho"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Esvaziar
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-650 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Items List scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                <div className="p-4 bg-teal-50 rounded-full text-teal-700">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-slate-700">Carrinho Vazio</span>
                <p className="text-xs text-slate-500 max-w-[200px]">Navegue pela loja e adicione itens para iniciar sua compra.</p>
              </div>
            ) : (
              items.map((item) => (
                <CartItemComponent key={item.productId} item={item} />
              ))
            )}
          </div>

          {/* Summary and Checkout button */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50/50 p-6 flex flex-col gap-4">
              <CartSummary />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
