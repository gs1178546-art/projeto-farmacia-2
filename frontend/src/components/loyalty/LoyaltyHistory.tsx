'use client';

import React from 'react';
import { LoyaltyTransaction } from '../../types/loyalty';
import Table from '../ui/Table';

interface LoyaltyHistoryProps {
  transactions: LoyaltyTransaction[];
}

export const LoyaltyHistory: React.FC<LoyaltyHistoryProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="py-10 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
        <span className="text-slate-400 font-bold text-sm">Nenhuma movimentação de cashback</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-slate-850">Extrato de Crédito & Resgates</h3>
      
      <Table headers={['Data', 'Descrição', 'Tipo', 'Valor']}>
        {transactions.map((tx) => {
          const isCredit = tx.type === 'credit';
          const formattedDate = new Date(tx.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <tr key={tx.id} className="hover:bg-slate-50/50">
              <td className="px-6 py-4 text-xs font-semibold text-slate-550">{formattedDate}</td>
              <td className="px-6 py-4 text-xs text-slate-700 font-medium">{tx.description}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                  isCredit ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-750'
                }`}>
                  {isCredit ? 'Crédito' : 'Resgate'}
                </span>
              </td>
              <td className={`px-6 py-4 text-xs font-bold ${isCredit ? 'text-emerald-600' : 'text-red-500'}`}>
                {isCredit ? '+' : '-'} R$ {tx.amount.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
};

export default LoyaltyHistory;
