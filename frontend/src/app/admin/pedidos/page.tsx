'use client';

import React from 'react';
import LiveOrdersBoard from '../../../components/admin/orders/LiveOrdersBoard';

export default function AdminLiveOrdersPage() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xs">
      <LiveOrdersBoard />
    </div>
  );
}
