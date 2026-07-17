'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PromotionType } from '../../../types/promotion';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const promotionSchema = z.object({
  name: z.string().min(3, 'Nome da promoção obrigatório'),
  description: z.string().min(5, 'Descrição detalhada obrigatória'),
  type: z.enum(['discount', 'bogo', 'cashback_multiplier'] as const),
  value: z.preprocess((val) => Number(val), z.number().min(0.01, 'Valor inválido')),
  active: z.boolean().default(true),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

type PromotionFormData = z.infer<typeof promotionSchema>;

interface PromotionFormProps {
  onSubmit: (data: PromotionFormData) => void;
  defaultValues?: Partial<PromotionFormData>;
}

export const PromotionForm: React.FC<PromotionFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PromotionFormData>({
    resolver: zodResolver(promotionSchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome da Promoção"
          placeholder="Ex: Festival de Inverno"
          error={errors.name?.message}
          {...register('name')}
        />
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">Tipo de Promoção</label>
          <select
            className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
              errors.type ? 'border-red-500' : 'border-slate-205'
            }`}
            {...register('type')}
          >
            <option value="discount">Desconto Fixo (Porcentagem)</option>
            <option value="bogo">Leve Pague (BOGO)</option>
            <option value="cashback_multiplier">Multiplicador de Cashback</option>
          </select>
        </div>
      </div>

      <Input
        label="Descrição da Campanha"
        placeholder="Ex: Desconto em medicamentos selecionados para gripes e resfriados."
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Valor do Benefício"
          type="number"
          step="0.1"
          placeholder="Ex: 15 (% de desconto) ou 2 (multiplicador)"
          error={errors.value?.message}
          {...register('value')}
        />
        <Input
          label="Data de Início (Opcional)"
          type="date"
          error={errors.startDate?.message}
          {...register('startDate')}
        />
        <Input
          label="Data de Término (Opcional)"
          type="date"
          error={errors.endDate?.message}
          {...register('endDate')}
        />
      </div>

      <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer mt-1">
        <input
          type="checkbox"
          className="rounded border-slate-350 text-teal-700 focus:ring-teal-500 w-4.5 h-4.5 cursor-pointer"
          {...register('active')}
        />
        Promoção Ativa (Disponibilizar na loja imediatamente)
      </label>

      <Button type="submit" className="w-full mt-3 rounded-xl">
        Criar Promoção
      </Button>
    </form>
  );
};

export default PromotionForm;
