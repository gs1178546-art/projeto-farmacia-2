'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ShoppingCart, ShieldAlert, FileText, ArrowLeft, Plus, Minus, Award } from 'lucide-react';
import { getProductBySlug } from '../../../services/productService';
import { Product } from '../../../types/product';
import { useCart } from '../../../hooks/useCart';
import { useToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';
import LoyaltyCashbackBadge from '../../../components/loyalty/LoyaltyCashbackBadge';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        const res = await getProductBySlug(slug);
        setProduct(res);
      } catch (e) {
        console.error('Error loading product details', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full py-16 text-center flex flex-col gap-4 items-center">
        <span className="text-slate-400 font-bold text-sm">Produto não encontrado</span>
        <Link href="/">
          <Button variant="outline" className="rounded-xl">Voltar para Loja</Button>
        </Link>
      </div>
    );
  }

  const finalPrice = product.promoPrice || product.price;

  const handleAdd = () => {
    addItem(product, qty);
    toast({
      type: 'success',
      title: 'Carrinho atualizado',
      description: `${qty}x ${product.name} adicionado ao carrinho.`
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <div>
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para Loja
        </Link>
      </div>

      {/* Main product presentation block */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xs">
        
        {/* Left Column product image */}
        <div className="w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          
          {product.requiresPrescription && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-150 text-red-700 border border-red-250 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
              <ShieldAlert className="w-4 h-4" />
              Receita Obrigatória
            </div>
          )}
        </div>

        {/* Right Column metadata and purchase config */}
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex flex-col gap-2">
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
              {product.name}
            </h1>
            <span className="text-xs text-slate-400 font-semibold uppercase">SKU: {product.sku}</span>
          </div>

          {/* Pricing area */}
          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-slate-50/50 border border-slate-100">
            <div className="flex items-baseline gap-2">
              {product.promoPrice && (
                <span className="text-sm text-slate-405 line-through">
                  R$ {product.price.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-black text-teal-800">
                R$ {finalPrice.toFixed(2)}
              </span>
            </div>
            
            <div className="mt-1">
              <LoyaltyCashbackBadge percentage={5} />
            </div>
          </div>

          {/* Controlled warning prescription */}
          {product.requiresPrescription && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 p-4 rounded-xl text-xs text-amber-800">
              <FileText className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold block">Atenção: Medicamento sob prescrição</span>
                <p className="mt-0.5 leading-relaxed">
                  Para comprar este medicamento, você deve enviar e apresentar a receita original no momento da entrega do pedido.
                </p>
              </div>
            </div>
          )}

          {/* Add to cart panel */}
          <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="p-2 rounded-lg text-slate-500 hover:bg-white hover:text-slate-700 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-slate-800 w-6 text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="p-2 rounded-lg text-slate-500 hover:bg-white hover:text-slate-700 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Button onClick={handleAdd} className="flex-1 gap-2 rounded-xl py-3.5">
              <ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho
            </Button>
          </div>
        </div>

      </div>

      {/* Description block */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Descrição do Produto</h3>
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
        
        {product.registryNumber && (
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 flex flex-col gap-1 font-semibold">
            <span>Registro ANVISA: {product.registryNumber}</span>
            {product.ean && <span>Código EAN: {product.ean}</span>}
          </div>
        )}
      </div>

    </div>
  );
}
