'use client';

import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { useLoyalty } from '../../hooks/useLoyalty';
import { updateLoyaltyConfig } from '../../services/loyaltyService';
import LoyaltyConfigForm from '../../components/admin/loyalty-config/LoyaltyConfigForm';
import { useToast } from '../../components/ui/Toast';
import Spinner from '../../components/ui/Spinner';

export default function AdminLoyaltyConfigPage() {
  const { toast } = useToast();
  const { config, creditLoyalty } = useLoyalty();
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      await updateLoyaltyConfig(data);
      toast({
        type: 'success',
        title: 'Configurações Salvas',
        description: 'Parâmetros do programa de cashback atualizados.'
      });
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível atualizar as regras de fidelidade.'
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
      
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-1.5">
          <Award className="w-5 h-5 text-teal-500" />
          Configuração do Programa de Cashback (Fidelidade)
        </h1>
        <p className="text-xs text-slate-400">Gerencie a porcentagem padrão de cashback creditado e o valor mínimo de resgate.</p>
      </div>

      {!config ? (
        <div className="py-16 flex items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <LoyaltyConfigForm
          onSubmit={handleSubmit}
          defaultValues={config}
          isLoading={formLoading}
        />
      )}

    </div>
  );
}
