'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLoyalty } from '../../hooks/useLoyalty';
import LoyaltyBalance from '../../components/loyalty/LoyaltyBalance';
import LoyaltyHistory from '../../components/loyalty/LoyaltyHistory';
import Spinner from '../../components/ui/Spinner';

export default function AccountLoyaltyPage() {
  const { user, isAuthenticated } = useAuth();
  const { transactions, loading } = useLoyalty();

  if (!isAuthenticated) {
    return (
      <div className="py-16 text-center flex flex-col gap-4 items-center">
        <span className="text-slate-400 font-bold text-sm">Acesso restrito</span>
        <Link href="/conta">
          <button className="px-4 py-2 bg-teal-700 text-white rounded-lg text-xs font-bold cursor-pointer">
            Fazer Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div>
        <Link href="/conta" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Minha Conta
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-black text-slate-900">Programa de Fidelidade</h1>
        <p className="text-xs text-slate-500">Confira seu saldo de cashback acumulado e o extrato completo de transações.</p>
      </div>

      {/* Balance card */}
      <LoyaltyBalance balance={user?.cashbackBalance || 0} />

      {/* Transaction History ledger table */}
      {loading ? (
        <div className="w-full py-16 flex items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <LoyaltyHistory transactions={transactions} />
      )}

    </div>
  );
}
