'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, FileText, ArrowRight, ShoppingBag, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, loginCustomer, logout } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !document) return;
    setLoading(true);
    try {
      await loginCustomer(email, document);
      toast({
        type: 'success',
        title: 'Sucesso',
        description: 'Login efetuado com sucesso.'
      });
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Falha no login',
        description: 'Dados inválidos ou erro de conexão.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md w-full mx-auto bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-xl font-black text-slate-850">Acesse sua Conta</h2>
          <p className="text-xs text-slate-500">Veja seu histórico de pedidos e saldo do programa de fidelidade.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="E-mail"
            placeholder="Ex: exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="CPF (apenas números)"
            placeholder="Ex: 123.456.789-00"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            required
          />
          <Button type="submit" isLoading={loading} className="w-full mt-2 rounded-xl py-2.5">
            Entrar / Criar Conta
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Olá, {user?.name}!</h1>
          <p className="text-xs text-slate-500">Abaixo você pode ver seus dados cadastrais, histórico e cashback.</p>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="rounded-xl">
          Sair da Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column Profile info */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Meus Dados</h3>
          
          <div className="text-xs flex flex-col gap-3 text-slate-600">
            <div className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user?.email}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{user?.phone}</span>
            </div>
            <div className="flex gap-2 items-center">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>CPF: {user?.document}</span>
            </div>
          </div>
        </div>

        {/* Right Columns shortcuts */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Orders History shortcut */}
          <Link 
            href="/conta/pedidos" 
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:border-slate-205 transition-all flex flex-col gap-4 justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-50 rounded-xl text-teal-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Meus Pedidos</span>
                <span className="text-[10px] text-slate-400">Verifique entregas anteriores</span>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-700 flex items-center gap-1 hover:underline">
              Ir para Pedidos <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Cashback Loyalty Wallet shortcut */}
          <Link 
            href="/conta/fidelidade" 
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:border-slate-205 transition-all flex flex-col gap-4 justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Fidelidade & Cashback</span>
                <span className="text-[10px] text-slate-400">Consulte seu saldo acumulado</span>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-700 flex items-center gap-1 hover:underline">
              Ir para Fidelidade <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

        </div>

      </div>
    </div>
  );
}
