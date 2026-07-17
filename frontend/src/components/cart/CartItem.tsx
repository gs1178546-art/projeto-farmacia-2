'use client';

import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem, useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItem;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-all">
      
      {/* Product Image */}
      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col gap-0.5">
        <span className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug">
          {item.name}
        </span>
        <span className="text-xs text-teal-800 font-extrabold">
          R$ {item.price.toFixed(2)}
        </span>
      </div>

      {/* Adjust quantity controls */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="p-1 rounded-md text-slate-500 hover:bg-white hover:text-slate-700 transition-colors cursor-pointer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-bold text-slate-800 w-4 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="p-1 rounded-md text-slate-500 hover:bg-white hover:text-slate-700 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        
        <button
          onClick={() => removeItem(item.productId)}
          className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

export default CartItemComponent;
