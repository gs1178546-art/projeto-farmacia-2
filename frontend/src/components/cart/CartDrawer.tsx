'use client';

import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const subtotal = getSubtotal();
  const freeDeliveryAbove = 79;
  const deliveryFee = subtotal >= freeDeliveryAbove ? 0 : 8.90;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-700 text-gray-900">Seu Carrinho</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
              <ShoppingBag size={36} className="text-gray-300" />
            </div>
            <div>
              <p className="font-600 text-gray-700">Seu carrinho está vazio</p>
              <p className="text-sm text-gray-400 mt-1">Adicione produtos para continuar</p>
            </div>
            <Button variant="outline" onClick={onClose}>Continuar Comprando</Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {/* Free delivery progress */}
              {subtotal < freeDeliveryAbove && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                  <p className="text-xs text-green-700 font-600">
                    Falta <strong>{formatCurrency(freeDeliveryAbove - subtotal)}</strong> para frete grátis! 🎉
                  </p>
                  <div className="mt-2 h-1.5 bg-green-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / freeDeliveryAbove) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {subtotal >= freeDeliveryAbove && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-xs text-green-700 font-700">✅ Frete grátis aplicado!</p>
                </div>
              )}

              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-600 text-gray-900 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-700 text-primary-600">{formatCurrency(item.unitPrice)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-700 text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-5 flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-600">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Entrega</span>
                  <span className={`font-600 ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'Grátis' : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-900 font-700 text-base border-t border-gray-100 pt-2 mt-1">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal + deliveryFee)}</span>
                </div>
              </div>
              <Link href="/checkout" onClick={onClose} className="block">
                <Button className="w-full" size="lg">Finalizar Pedido</Button>
              </Link>
              <button onClick={onClose} className="text-xs text-center text-gray-400 hover:text-gray-600 transition-colors">
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
