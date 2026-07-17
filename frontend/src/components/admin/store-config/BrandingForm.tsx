'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StoreBranding } from '../../../types/store';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const brandingSchema = z.object({
  name: z.string().min(3, 'Nome da farmácia é obrigatório'),
  primaryColor: z.string().min(4, 'Cor primária hexadecimal inválida (Ex: #0f766e)'),
  secondaryColor: z.string().min(4, 'Cor secundária hexadecimal inválida'),
  logoUrl: z.string().url('URL do logo inválida').optional().or(z.literal(''))
});

type BrandingFormData = z.infer<typeof brandingSchema>;

interface BrandingFormProps {
  onSubmit: (data: BrandingFormData) => void;
  defaultValues?: Partial<StoreBranding>;
  isLoading?: boolean;
}

export const BrandingForm: React.FC<BrandingFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BrandingFormData>({
    resolver: zodResolver(brandingSchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome Fantasia da Farmácia (Tenant)"
          placeholder="Ex: BioSaúde Farmácia"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Logo URL"
          placeholder="https://exemplo.com/logo.png"
          error={errors.logoUrl?.message}
          {...register('logoUrl')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Cor Primária (Hexadecimal)"
          placeholder="Ex: #0f766e"
          error={errors.primaryColor?.message}
          {...register('primaryColor')}
        />
        <Input
          label="Cor Secundária (Hexadecimal)"
          placeholder="Ex: #0d9488"
          error={errors.secondaryColor?.message}
          {...register('secondaryColor')}
        />
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full mt-2 rounded-xl">
        Salvar Branding Visual
      </Button>
    </form>
  );
};

export default BrandingForm;
