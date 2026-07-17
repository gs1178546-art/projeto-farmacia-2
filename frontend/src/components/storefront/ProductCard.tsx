'use client';

import { ShoppingCart, Check, Tag, Gift } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types/product';
import { Promotion } from '@/types/promotion';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  promotion?: Promotion;
}

export function ProductCard({ product, promotion }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);

  const effectivePrice = promotion?.type === 'discount'
    ? product.priceOriginal * (1 - promotion.value / 100)
    : product.priceCurrent;

  const displayDiscount = promotion?.type === 'discount' ? promotion.value : product.discount;
  const hasDiscount = displayDiscount > 0;
  const isBogo = promotion?.type === 'bogo' || product.leve3Pague2;
  const isCashback = promotion?.type === 'cashback';

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      brand: product.brand,
      quantity: 1,
      unitPrice: effectivePrice,
      priceOriginal: hasDiscount ? product.priceOriginal : undefined,
      discount: displayDiscount,
      leve3Pague2: isBogo,
      promoType: promotion?.type,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative">
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-700 px-1.5 py-0.5 rounded-md">
            -{displayDiscount}%
          </span>
        )}
        <div className="h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div className="flex-1">
          <p className="text-[10px] font-700 text-gray-400 uppercase tracking-wide">{product.brand}</p>
          <h4 className="text-sm font-600 text-gray-900 line-clamp-2 mt-0.5 leading-snug">{product.name} — {product.quantity}</h4>

          {/* Promo badges */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.type === 'generico' && !isBogo && !isCashback && (
              <span className="text-[9px] font-700 px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md">Genérico</span>
            )}
            {isBogo && (
              <span className="text-[9px] font-700 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-md flex items-center gap-0.5">
                <Tag size={9} />
                Leve {promotion?.valueTake ?? 3} Pague {promotion?.valuePay ?? 2}
              </span>
            )}
            {isCashback && (
              <span className="text-[9px] font-700 px-1.5 py-0.5 bg-green-100 text-green-800 rounded-md flex items-center gap-0.5">
                <Gift size={9} />
                Cashback R$ {promotion!.value.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-0.5">
          {hasDiscount && (
            <span className="text-[11px] text-gray-400 line-through">{formatCurrency(product.priceOriginal)}</span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">R$</span>
            <span className="text-lg font-800 text-gray-900">{effectivePrice.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className={cn(
            'mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-700 transition-all duration-150',
            added
              ? 'bg-green-500 text-white'
              : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
          )}
        >
          {added ? <Check size={16} /> : <ShoppingCart size={16} />}
          {added ? 'Adicionado!' : 'Comprar'}
        </button>
      </div>
    </div>
  );
}
