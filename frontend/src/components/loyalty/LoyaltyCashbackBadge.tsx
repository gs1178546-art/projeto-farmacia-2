'use client';

import React from 'react';
import { Award } from 'lucide-react';

interface LoyaltyCashbackBadgeProps {
  percentage: number;
}

export const LoyaltyCashbackBadge: React.FC<LoyaltyCashbackBadgeProps> = ({ percentage }) => {
  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold shadow-2xs">
      <Award className="w-3.5 h-3.5" />
      <span>Ganhe {percentage}% de volta</span>
    </div>
  );
};

export default LoyaltyCashbackBadge;
