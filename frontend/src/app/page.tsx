'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, Info, FileText, Store, Percent, Award } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Carousel } from '@/components/storefront/Carousel';
import { ProductCard } from '@/components/storefront/ProductCard';
import { mockProducts } from '@/mocks/products';
import { mockPromotions } from '@/mocks/promotions';
import { mockCarouselSlides } from '@/mocks/carouselSlides';
import { mockStoreConfig } from '@/mocks/storeConfig';
import { ProductFilters } from '@/types/product';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const SHORTCUTS = [
  { icon: FileText, label: 'Receita Digital', color: 'bg-red-50 text-red-600' },
  { icon: Store, label: 'Compre e Retire', color: 'bg-blue-50 text-blue-600' },
  { icon: Percent, label: 'Ofertas do Dia', color: 'bg-orange-50 text-orange-600' },
  { icon: Award, label: 'Programa Fidelidade', color: 'bg-green-50 text-green-600' },
];

export default function StorefrontPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'todos',
    search: '',
    types: [],
    brands: [],
    dosages: [],
    maxPrice: 300,
  });

  const allBrands = useMemo(() => [...new Set(mockProducts.map((p) => p.brand))].sort(), []);
  const allDosages = useMemo(() => [...new Set(mockProducts.map((p) => p.dosage))].sort(), []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchCat = filters.category === 'todos' || p.category === filters.category;
      const matchSearch =
        !filters.search ||
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.brand.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = !filters.types?.length || filters.types.includes(p.type);
      const matchBrand = !filters.brands?.length || filters.brands.includes(p.brand);
      const matchDosage = !filters.dosages?.length || filters.dosages.includes(p.dosage);
      const matchPrice = p.priceCurrent <= (filters.maxPrice ?? 300);
      return matchCat && matchSearch && matchType && matchBrand && matchDosage && matchPrice;
    });
  }, [filters]);

  function getPromotion(productId: string) {
    return mockPromotions.find((pr) => pr.productId === productId && pr.active);
  }

  function toggleFilter(key: 'types' | 'brands' | 'dosages', value: string) {
    setFilters((prev) => {
      const current = prev[key] ?? [];
      return {
        ...prev,
        [key]: current.includes(value as never)
          ? current.filter((v) => v !== value)
          : [...current, value as never],
      };
    });
  }

  function clearFilters() {
    setFilters({ category: filters.category, search: filters.search, types: [], brands: [], dosages: [], maxPrice: 300 });
  }

  const hasActiveFilters =
    (filters.types?.length ?? 0) > 0 ||
    (filters.brands?.length ?? 0) > 0 ||
    (filters.dosages?.length ?? 0) > 0 ||
    (filters.maxPrice ?? 300) < 300;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={(q) => setFilters((f) => ({ ...f, search: q }))}
        onCategoryChange={(cat) => setFilters((f) => ({ ...f, category: cat as ProductFilters['category'] }))}
        activeCategory={filters.category}
      />

      {/* Spacer for fixed header (header ~135px tall) */}
      <div className="pt-[132px]" />

      <main className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-[148px]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-sm font-700 text-gray-900 flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-primary-600" />
                Filtros
              </h3>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-red-500 font-500 transition-colors">
                  Limpar
                </button>
              )}
            </div>

            {/* Type */}
            <div className="mb-5">
              <p className="text-[10px] font-700 uppercase tracking-wider text-gray-500 mb-2">Tipo de Produto</p>
              <div className="flex flex-col gap-2">
                {PRODUCT_TYPES.map((t) => (
                  <label key={t.value} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.types?.includes(t.value) ?? false}
                      onChange={() => toggleFilter('types', t.value)}
                      className="w-3.5 h-3.5 accent-primary-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{t.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="mb-5">
              <p className="text-[10px] font-700 uppercase tracking-wider text-gray-500 mb-2">Marca</p>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                {allBrands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.brands?.includes(b) ?? false}
                      onChange={() => toggleFilter('brands', b)}
                      className="w-3.5 h-3.5 accent-primary-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-5">
              <p className="text-[10px] font-700 uppercase tracking-wider text-gray-500 mb-2">Preço Máximo</p>
              <input
                type="range"
                min={0}
                max={300}
                step={5}
                value={filters.maxPrice ?? 300}
                onChange={(e) => setFilters((f) => ({ ...f, maxPrice: +e.target.value }))}
                className="w-full accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 font-500 mt-1">
                <span>R$ 0</span>
                <span className="text-primary-600 font-700">{formatCurrency(filters.maxPrice ?? 300)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Carousel */}
          <Carousel slides={mockCarouselSlides} />

          {/* Shortcuts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SHORTCUTS.map((s) => (
              <button key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2.5 hover:border-primary-200 hover:shadow-md transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <span className="text-xs font-700 text-gray-700 text-center">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Products section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-800 text-gray-900 flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-800 uppercase px-2 py-0.5 rounded-md">Ofertas</span>
                Ofertas Imperdíveis
              </h2>
              <span className="text-xs text-gray-400 font-600">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <Info size={40} className="text-gray-200" />
                <p className="font-600 text-gray-500">Nenhum produto encontrado</p>
                <p className="text-sm text-gray-400">Tente ajustar os filtros ou a busca</p>
                <button onClick={clearFilters} className="text-sm text-primary-600 font-600 hover:underline">
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} promotion={getPromotion(product.id)} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center text-white text-xs font-700">+</div>
              <span className="text-base font-800 text-white">Bio<span className="text-primary-500">Saúde</span></span>
            </div>
            <p className="text-xs leading-relaxed">Cuidando da sua saúde com carinho e qualidade.</p>
          </div>
          <div>
            <h4 className="text-sm font-700 text-white mb-3">Institucional</h4>
            <ul className="flex flex-col gap-2 text-xs">
              {['Sobre Nós', 'Nossas Lojas', 'Trabalhe Conosco', 'Blog de Saúde'].map((l) => (
                <li key={l}><a href="#" className="hover:text-primary-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-700 text-white mb-3">Ajuda</h4>
            <ul className="flex flex-col gap-2 text-xs">
              {['Atendimento', 'Políticas de Entrega', 'Trocas e Devoluções', 'Termos de Uso'].map((l) => (
                <li key={l}><a href="#" className="hover:text-primary-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-700 text-white mb-3">Pagamento</h4>
            <p className="text-xs">Pix, Cartão de Crédito/Débito, Dinheiro na Entrega</p>
          </div>
        </div>
        <div className="border-t border-gray-800 px-4 py-5">
          <div className="max-w-7xl mx-auto text-[10px] text-gray-500 space-y-1">
            <p><strong className="text-gray-400">ANVISA:</strong> {mockStoreConfig.razaoSocial} | CNPJ: {mockStoreConfig.cnpj}</p>
            <p>Farmacêutico Responsável: {mockStoreConfig.pharmacist} — {mockStoreConfig.crf} | AFE: {mockStoreConfig.afe}</p>
            <p className="mt-2">As informações contidas neste site não substituem as orientações de um profissional de saúde. Ao persistirem os sintomas, consulte um médico.</p>
            <p className="mt-2 text-gray-600">© 2026 {mockStoreConfig.name}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
