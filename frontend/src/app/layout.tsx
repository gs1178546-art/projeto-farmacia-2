'use client';

import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import { ToastProvider } from '../components/ui/Toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <html lang="pt-BR" className="h-full">
      <body className="flex flex-col min-h-screen bg-slate-50/50 font-sans antialiased text-slate-800">
        <ToastProvider>
          <Header onCartOpen={() => setCartOpen(true)} />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
            {children}
          </main>
          <Footer />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </ToastProvider>
      </body>
    </html>
  );
}
