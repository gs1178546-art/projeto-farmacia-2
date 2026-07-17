'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Palette } from 'lucide-react';
import { useStoreConfigStore } from '../../store/storeConfigStore';
import { updateStoreConfig } from '../../services/storeConfigService';
import BrandingForm from '../../components/admin/store-config/BrandingForm';
import AnvisaForm from '../../components/admin/store-config/AnvisaForm';
import { useToast } from '../../components/ui/Toast';
import Spinner from '../../components/ui/Spinner';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const { config, updateConfig } = useStoreConfigStore();
  const [formLoading, setFormLoading] = useState(false);

  // Tabs state: 'branding' | 'anvisa'
  const [activeTab, setActiveTab] = useState<'branding' | 'anvisa'>('branding');

  const handleBrandingSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      const updated = await updateStoreConfig({ branding: data });
      updateConfig(updated);
      toast({
        type: 'success',
        title: 'Configurações Salvas',
        description: 'Dados de branding visual atualizados.'
      });
    } catch (e) {
      console.error(e);
    } finally {
      setFormLoading(false);
    }
  };

  const handleAnvisaSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      const updated = await updateStoreConfig({ anvisa: data });
      updateConfig(updated);
      toast({
        type: 'success',
        title: 'Dados ANVISA Atualizados',
        description: 'Informações regulatórias salvas com sucesso.'
      });
    } catch (e) {
      console.error(e);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
      
      {/* Title */}
      <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-1.5">
            <Settings className="w-5 h-5 text-teal-500" />
            Configurações da Loja (Tenant Config)
          </h1>
          <p className="text-xs text-slate-400">Gerencie a identidade visual da farmácia e os dados regulatórios exigidos pela ANVISA.</p>
        </div>
      </div>

      {/* Tabs switches */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('branding')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all cursor-pointer ${
            activeTab === 'branding'
              ? 'bg-teal-700 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          Branding Visual (Cores & Logos)
        </button>
        <button
          onClick={() => setActiveTab('anvisa')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all cursor-pointer ${
            activeTab === 'anvisa'
              ? 'bg-teal-700 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          Informações Obrigatórias (ANVISA)
        </button>
      </div>

      {formLoading ? (
        <div className="py-16 flex items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : activeTab === 'branding' ? (
        <BrandingForm
          onSubmit={handleBrandingSubmit}
          defaultValues={config?.branding}
        />
      ) : (
        <AnvisaForm
          onSubmit={handleAnvisaSubmit}
          defaultValues={config?.anvisa}
        />
      )}

    </div>
  );
}
