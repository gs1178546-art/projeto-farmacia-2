'use client';

import React, { useState } from 'react';
import { Percent, Plus } from 'lucide-react';
import { mockPromotions } from '../../../mocks/promotions';
import { Promotion } from '../../../types/promotion';
import PromotionsTable from '../../../components/admin/promotions/PromotionsTable';
import PromotionForm from '../../../components/admin/promotions/PromotionForm';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../components/ui/Toast';

export default function AdminPromotionsPage() {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreatePromotion = async (data: any) => {
    setFormLoading(true);
    try {
      const newPromo: Promotion = {
        ...data,
        id: `promo-${Math.random().toString(36).substr(2, 9)}`
      };
      setPromotions((prev) => [newPromo, ...prev]);
      toast({
        type: 'success',
        title: 'Campanha Criada',
        description: 'A nova promoção foi ativada na loja.'
      });
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleActive = (id: string, current: boolean) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !current } : p))
    );
    toast({
      type: 'info',
      title: 'Status Alterado',
      description: 'O status da campanha foi atualizado com sucesso.'
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Deseja realmente excluir esta campanha promocional?')) return;
    setPromotions((prev) => prev.filter((p) => p.id !== id));
    toast({
      type: 'success',
      title: 'Campanha Removida',
      description: 'A promoção foi excluída do sistema.'
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-1.5">
            <Percent className="w-5 h-5 text-teal-500" />
            Promoções & Cupons
          </h1>
          <p className="text-xs text-slate-400">Configure descontos fixos, compre leve-pague (BOGO) ou cashback turbinado.</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="rounded-xl flex items-center gap-1.5">
          <Plus className="w-4.5 h-4.5" /> Nova Promoção
        </Button>
      </div>

      <PromotionsTable
        promotions={promotions}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
      />

      {/* Editor Modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title="Nova Campanha Promocional"
          size="lg"
        >
          <PromotionForm
            onSubmit={handleCreatePromotion}
          />
        </Modal>
      )}

    </div>
  );
}
