'use client';

import React from 'react';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="w-full py-16 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-16 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex flex-col gap-2">
        <span className="text-slate-400 font-bold text-sm">Nenhum produto encontrado</span>
        <p className="text-xs text-slate-500">Tente alterar os filtros ou o termo de busca.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
