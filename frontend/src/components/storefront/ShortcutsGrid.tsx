'use client';

import React from 'react';
import { Pill, Sun, Smile, Award, Activity, Heart, ShoppingBag, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface ShortcutsGridProps {
  onSelectCategory: (cat: string | null) => void;
}

export const ShortcutsGrid: React.FC<ShortcutsGridProps> = ({ onSelectCategory }) => {
  const shortcuts = [
    { title: 'Medicamentos', cat: 'Medicamentos', icon: <Pill className="w-6 h-6 text-teal-700" />, bg: 'bg-teal-50' },
    { title: 'Proteção Solar', cat: 'Dermocosméticos', icon: <Sun className="w-6 h-6 text-amber-600" />, bg: 'bg-amber-50' },
    { title: 'Cuidados Pessoais', cat: 'Dermocosméticos', icon: <Smile className="w-6 h-6 text-pink-700" />, bg: 'bg-pink-50' },
    { title: 'Vitaminas & Imunidade', cat: 'Vitaminas', icon: <Activity className="w-6 h-6 text-sky-700" />, bg: 'bg-sky-50' },
    { title: 'Linha Infantil', cat: 'Infantil', icon: <Heart className="w-6 h-6 text-indigo-700" />, bg: 'bg-indigo-50' },
    { title: 'Cashback 5%', cat: null, icon: <Award className="w-6 h-6 text-emerald-700" />, bg: 'bg-emerald-50', link: '/conta/fidelidade' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full">
      {shortcuts.map((s, i) => {
        if (s.link) {
          return (
            <Link
              key={i}
              href={s.link}
              className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-2xl bg-white hover:border-slate-200 hover:shadow-xs transition-all cursor-pointer group text-center"
            >
              <div className={`p-3.5 ${s.bg} rounded-full group-hover:scale-105 transition-transform duration-200`}>
                {s.icon}
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2.5 line-clamp-1">
                {s.title}
              </span>
            </Link>
          );
        }

        return (
          <button
            key={i}
            onClick={() => onSelectCategory(s.cat)}
            className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-2xl bg-white hover:border-slate-200 hover:shadow-xs transition-all cursor-pointer group text-center"
          >
            <div className={`p-3.5 ${s.bg} rounded-full group-hover:scale-105 transition-transform duration-200`}>
              {s.icon}
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2.5 line-clamp-1">
              {s.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ShortcutsGrid;
