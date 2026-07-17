'use client';

import React from 'react';
import { Filter, SlidersHorizontal, ShieldAlert, Award } from 'lucide-react';
import Input from '../ui/Input';

interface SidebarFiltersProps {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (p: string) => void;
  setMaxPrice: (p: string) => void;
  requiresPrescription: boolean | null;
  setRequiresPrescription: (val: boolean | null) => void;
  onlyPromotions: boolean;
  setOnlyPromotions: (val: boolean) => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  requiresPrescription,
  setRequiresPrescription,
  onlyPromotions,
  setOnlyPromotions
}) => {
  return (
    <div className="w-full flex flex-col gap-6 p-5 border border-slate-100 bg-white rounded-2xl shadow-xs">
      
      {/* Header filters */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-teal-700" />
          Filtros de Busca
        </h3>
      </div>

      {/* Filter by Promotions */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-slate-500">Ofertas</span>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyPromotions}
            onChange={(e) => setOnlyPromotions(e.target.checked)}
            className="rounded border-slate-300 text-teal-700 focus:ring-teal-500 w-4 h-4 cursor-pointer"
          />
          Ver apenas produtos em promoção
        </label>
      </div>

      {/* Prescription Filter */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-slate-500">Necessita Receita?</span>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="prescription"
              checked={requiresPrescription === null}
              onChange={() => setRequiresPrescription(null)}
              className="border-slate-300 text-teal-700 focus:ring-teal-500 w-4 h-4 cursor-pointer"
            />
            Qualquer um
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="prescription"
              checked={requiresPrescription === true}
              onChange={() => setRequiresPrescription(true)}
              className="border-slate-300 text-teal-700 focus:ring-teal-500 w-4 h-4 cursor-pointer"
            />
            Sim (Venda sob receita)
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="prescription"
              checked={requiresPrescription === false}
              onChange={() => setRequiresPrescription(false)}
              className="border-slate-300 text-teal-700 focus:ring-teal-500 w-4 h-4 cursor-pointer"
            />
            Não (Venda livre / MIPs)
          </label>
        </div>
      </div>

      {/* Price range inputs */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-semibold text-slate-500">Faixa de Preço (R$)</span>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full text-center"
          />
          <span className="text-slate-400 text-xs">-</span>
          <Input
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full text-center"
          />
        </div>
      </div>

    </div>
  );
};

export default SidebarFilters;
