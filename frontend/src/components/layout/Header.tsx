'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Package, Plus, Search, X, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { mockStoreConfig } from '@/mocks/storeConfig';
import { mockAuthUser, mockAdminUser } from '@/mocks/customers';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  activeCategory?: string;
}

export function Header({ onSearch, onCategoryChange, activeCategory = 'todos' }: HeaderProps) {
  const router = useRouter();
  const { getTotalItems, isOpen, openCart, closeCart } = useCartStore();
  const { user, login, logout, isAdmin } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [cepOpen, setCepOpen] = useState(false);
  const [cep, setCep] = useState('');

  const totalItems = getTotalItems();

  function handleSearch(val: string) {
    setSearchQuery(val);
    onSearch?.(val);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    if (loginEmail === 'admin@biosaude.com' && loginPassword === 'admin123') {
      login({ ...mockAdminUser, token: 'mock-token' });
      setLoginOpen(false);
      router.push('/admin');
    } else if (loginEmail && loginPassword) {
      login({ ...mockAuthUser, token: 'mock-token' });
      setLoginOpen(false);
    } else {
      setLoginError('E-mail ou senha inválidos.');
    }
  }

  function handleAccountClick() {
    if (user) {
      logout();
    } else {
      setLoginOpen(true);
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        {/* Main header row */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Plus size={18} strokeWidth={3} />
            </div>
            <span className="text-xl font-800 text-gray-900 hidden sm:block">
              Bio<span className="text-primary-600">Saúde</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar medicamentos, vitaminas, beleza..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:bg-white focus:ring-2 focus:ring-primary-600/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleAccountClick}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-600 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <User size={18} />
              <span className="hidden md:block">{user ? user.name.split(' ')[0] : 'Entrar'}</span>
            </button>
            {user && (
              <Link
                href="/conta/pedidos"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-600 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Package size={18} />
                <span className="hidden md:block">Pedidos</span>
              </Link>
            )}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-600 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-red-600 text-white text-[10px] font-800 rounded-full px-1 border-2 border-white">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className="hidden md:block">Carrinho</span>
            </button>
          </div>
        </div>

        {/* Sub-header: CEP + categories */}
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-4">
            <button
              onClick={() => setCepOpen(true)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-600 transition-colors shrink-0 border border-gray-200 rounded-md px-2.5 py-1.5 hover:bg-primary-50 hover:border-primary-200"
            >
              <MapPin size={12} className="text-primary-600" />
              <span>Entregar em: <strong className="text-gray-700">{cep || 'Selecionar CEP'}</strong></span>
            </button>
            <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange?.(cat.value)}
                  className={`shrink-0 px-3 py-1.5 rounded-2xl text-xs font-600 border transition-all ${
                    activeCategory === cat.value
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isOpen} onClose={closeCart} />

      {/* Login Modal */}
      <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)} title="Acessar Minha Conta" size="sm">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            Use <strong>admin@biosaude.com</strong> / <strong>admin123</strong> para acessar o painel admin.
          </p>
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <Button type="submit" className="w-full" size="lg">Entrar</Button>
        </form>
      </Modal>

      {/* CEP Modal */}
      <Modal isOpen={cepOpen} onClose={() => setCepOpen(false)} title="Onde quer receber?" size="sm">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">Digite seu CEP para ver prazos e disponibilidade na sua região.</p>
          <div className="flex gap-2">
            <Input
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9))}
              className="flex-1"
            />
            <Button onClick={() => setCepOpen(false)} disabled={cep.length < 9}>Confirmar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
