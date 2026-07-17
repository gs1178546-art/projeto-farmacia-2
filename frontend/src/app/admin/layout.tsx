'use client';

import React from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-900 min-h-screen text-slate-100">
      {/* Sidebar Panel Navigation */}
      <AdminSidebar />

      {/* Main dashboard content area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-950/60">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}
