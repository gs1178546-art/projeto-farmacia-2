'use client';

import React from 'react';
import { Percent, Award, Trash2 } from 'lucide-react';
import { Promotion } from '../../../types/promotion';
import Table from '../../ui/Table';

interface PromotionsTableProps {
  promotions: Promotion[];
  onToggleActive: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}

export const PromotionsTable: React.FC<PromotionsTableProps> = ({
  promotions,
  onToggleActive,
  onDelete
}) => {
  return (
    <Table headers={['Nome / Campanha', 'Tipo', 'Valor', 'Status', 'Ações']}>
      {promotions.map((promo) => {
        const types: Record<Promotion['type'], { label: string; icon: React.ReactNode; bg: string }> = {
          discount: { label: 'Desconto Fixo', icon: <Percent className="w-3.5 h-3.5 text-teal-700" />, bg: 'bg-teal-50 text-teal-700' },
          bogo: { label: 'Leve Pague (BOGO)', icon: <Percent className="w-3.5 h-3.5 text-amber-700" />, bg: 'bg-amber-50 text-amber-700' },
          cashback_multiplier: { label: 'Multiplicador Cashback', icon: <Award className="w-3.5 h-3.5 text-emerald-700" />, bg: 'bg-emerald-50 text-emerald-700' }
        };

        const currentType = types[promo.type] || { label: promo.type, icon: null, bg: 'bg-slate-50 text-slate-700' };

        return (
          <tr key={promo.id} className="hover:bg-slate-50/50">
            <td className="px-6 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-slate-800 text-xs">{promo.name}</span>
                <span className="text-[10px] text-slate-500 line-clamp-1">{promo.description}</span>
              </div>
            </td>

            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${currentType.bg}`}>
                {currentType.icon}
                {currentType.label}
              </span>
            </td>

            <td className="px-6 py-4 text-xs font-semibold text-slate-700">
              {promo.type === 'discount' ? `${promo.value}%` : promo.type === 'bogo' ? `BOGO` : `${promo.value}x`}
            </td>

            <td className="px-6 py-4">
              <button
                onClick={() => onToggleActive(promo.id, promo.active)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  promo.active ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {promo.active ? 'Ativa' : 'Inativa'}
              </button>
            </td>

            <td className="px-6 py-4">
              <button
                onClick={() => onDelete(promo.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-red-650 hover:bg-red-50 transition-colors cursor-pointer"
                title="Excluir"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

export default PromotionsTable;
