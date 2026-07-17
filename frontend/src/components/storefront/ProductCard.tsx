'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, ShieldAlert } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../ui/Toast';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product);
    toast({
      type: 'success',
      title: 'Adicionado ao carrinho',
      description: `${product.name} foi adicionado com sucesso.`
    });
  };

  const finalPrice = product.promoPrice || product.price;
  const discountPercentage = product.promoPrice 
    ? Math.round(((product.price - product.promoPrice) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300">
      
      {/* Discount & Prescription Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discountPercentage > 0 && (
          <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-md">
            -{discountPercentage}% Off
          </span>
        )}
        {product.requiresPrescription && (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 border border-red-200 text-[9px] font-bold rounded-md flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            Receita Obrigatória
          </span>
        )}
      </div>

      {/* Image container */}
      <Link href={`/produto/${product.slug}`} className="w-full aspect-square rounded-xl overflow-hidden bg-slate-50 relative block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product metadata */}
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          {product.category}
        </span>
        <Link href={`/produto/${product.slug}`} className="text-sm font-bold text-slate-800 line-clamp-2 hover:text-teal-700 transition-colors">
          {product.name}
        </Link>
      </div>

      {/* Pricing and Buying CTA */}
      <div className="flex items-end justify-between pt-2 border-t border-slate-50">
        <div className="flex flex-col">
          {product.promoPrice && (
            <span className="text-xs text-slate-400 line-through">
              R$ {product.price.toFixed(2)}
            </span>
          )}
          <span className="text-base font-extrabold text-teal-800">
            R$ {finalPrice.toFixed(2)}
          </span>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          variant="primary" 
          size="sm" 
          className="rounded-xl p-2.5"
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
};

export default ProductCard;
