'use client';

import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { Product } from '../types/product';
import Carousel from '../components/storefront/Carousel';
import ShortcutsGrid from '../components/storefront/ShortcutsGrid';
import CategoryNav from '../components/storefront/CategoryNav';
import SidebarFilters from '../components/storefront/SidebarFilters';
import ProductGrid from '../components/storefront/ProductGrid';
import { useStoreConfigStore } from '../store/storeConfigStore';

export default function StorefrontPage() {
  const { config } = useStoreConfigStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [onlyPromotions, setOnlyPromotions] = useState(false);
  const [requiresPrescription, setRequiresPrescription] = useState<boolean | null>(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = ['Medicamentos', 'Dermocosméticos', 'Vitaminas', 'Infantil'];

  useEffect(() => {
    async function loadFilteredProducts() {
      setLoading(true);
      try {
        const filters = {
          category: selectedCategory || undefined,
          onlyPromotions: onlyPromotions || undefined,
          requiresPrescription: requiresPrescription !== null ? requiresPrescription : undefined,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
        };

        const res = await getProducts(filters);
        setProducts(res.filter((p) => p.active));
      } catch (e) {
        console.error('Error loading products', e);
      } finally {
        setLoading(false);
      }
    }
    
    loadFilteredProducts();
  }, [selectedCategory, onlyPromotions, requiresPrescription, minPrice, maxPrice]);

  return (
    <div className="flex flex-col gap-8">
      {/* Visual Banners Carousel */}
      <Carousel />

      {/* Main Categories Shortcuts */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Atalhos Rápidos</h3>
        <ShortcutsGrid onSelectCategory={setSelectedCategory} />
      </div>

      {/* Main Grid display & filters */}
      <div className="flex flex-col gap-6" id="produtos">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-black text-slate-900">Nossa Vitrine</h2>
          <p className="text-xs text-slate-500">Explore nossa linha completa de medicamentos e perfumaria de alta qualidade.</p>
        </div>

        {/* Category sliding filters */}
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar widget Filters */}
          <div className="w-full lg:w-64 shrink-0">
            <SidebarFilters
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              requiresPrescription={requiresPrescription}
              setRequiresPrescription={setRequiresPrescription}
              onlyPromotions={onlyPromotions}
              setOnlyPromotions={setOnlyPromotions}
            />
          </div>

          {/* Grid display */}
          <div className="flex-1 w-full">
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
