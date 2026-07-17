'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoyaltyConfig } from '../../../types/loyalty';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const loyaltySchema = z.object({
  cashbackPercentage: z.preprocess((val) => Number(val), z.number().min(0, 'Valor não pode ser negativo')),
  minRedeemAmount: z.preprocess((val) => Number(val), z.number().min(0.01, 'Valor deve ser maior que zero')),
  validityDays: z.preprocess((val) => Number(val), z.number().min(1, 'Validade inválida')),
  active: z.boolean().default(true)
});

type LoyaltyFormData = z.infer<typeof loyaltySchema>;

interface LoyaltyConfigFormProps {
  onSubmit: (data: LoyaltyFormData) => void;
  defaultValues?: Partial<LoyaltyConfig>;
  isLoading?: boolean;
}

export const LoyaltyConfigForm: React.FC<LoyaltyConfigFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoyaltyFormData>({
    resolver: zodResolver(loyaltySchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Cashback Padrão (%)"
          type="number"
          step="0.1"
          placeholder="Ex: 5"
          error={errors.cashbackPercentage?.message}
          {...register('cashbackPercentage')}
        />
        <Input
          label="Mínimo para Resgate (R$)"
          type="number"
          step="0.01"
          placeholder="Ex: 10.00"
          error={errors.minRedeemAmount?.message}
          {...register('minRedeemAmount')}
        />
        <Input
          label="Validade dos Créditos (Dias)"
          type="number"
          placeholder="Ex: 180"
          error={errors.validityDays?.message}
          {...register('validityDays')}
        />
      </div>

      <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer mt-1">
        <input
          type="checkbox"
          className="rounded border-slate-350 text-teal-700 focus:ring-teal-500 w-4.5 h-4.5 cursor-pointer"
          {...register('active')}
        />
        Programa de Fidelidade Ativo (Exibir cashback e extratos)
      </label>

      <Button type="submit" isLoading={isLoading} className="w-full mt-3 rounded-xl">
        Salvar Configuração de Cashback
      </Button>
    </form>
  );
};

export default LoyaltyConfigForm;
