'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StoreAnvisa } from '../../../types/store';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const anvisaSchema = z.object({
  corporateName: z.string().min(5, 'Razão social obrigatória'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  pharmacistInCharge: z.string().min(5, 'Nome do farmacêutico obrigatório'),
  pharmacistCrf: z.string().min(4, 'CRF obrigatório'),
  afeNumber: z.string().min(4, 'Número AFE obrigatório'),
  licenseNumber: z.string().min(4, 'Licença sanitária obrigatória'),
  address: z.string().min(10, 'Endereço completo obrigatório')
});

type AnvisaFormData = z.infer<typeof anvisaSchema>;

interface AnvisaFormProps {
  onSubmit: (data: AnvisaFormData) => void;
  defaultValues?: Partial<StoreAnvisa>;
  isLoading?: boolean;
}

export const AnvisaForm: React.FC<AnvisaFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AnvisaFormData>({
    resolver: zodResolver(anvisaSchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Razão Social"
          placeholder="Ex: BioSaúde Drogarias e Perfumaria Ltda"
          error={errors.corporateName?.message}
          {...register('corporateName')}
        />
        <Input
          label="CNPJ"
          placeholder="00.000.000/0001-00"
          error={errors.cnpj?.message}
          {...register('cnpj')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Farmacêutico(a) Responsável"
          placeholder="Ex: Dra. Ana Paula Medeiros"
          error={errors.pharmacistInCharge?.message}
          {...register('pharmacistInCharge')}
        />
        <Input
          label="CRF do Farmacêutico"
          placeholder="Ex: CRF-SP 45678"
          error={errors.pharmacistCrf?.message}
          {...register('pharmacistCrf')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Autorização de Funcionamento (AFE ANVISA)"
          placeholder="Ex: 7.12345.6"
          error={errors.afeNumber?.message}
          {...register('afeNumber')}
        />
        <Input
          label="Licença Sanitária Municipal / Estadual"
          placeholder="Ex: L-SP-998877"
          error={errors.licenseNumber?.message}
          {...register('licenseNumber')}
        />
      </div>

      <Input
        label="Endereço de Licenciamento"
        placeholder="Av. Paulista, 1000 - Bela Vista, São Paulo - SP, CEP 01310-100"
        error={errors.address?.message}
        {...register('address')}
      />

      <Button type="submit" isLoading={isLoading} className="w-full mt-2 rounded-xl">
        Salvar Informações ANVISA
      </Button>
    </form>
  );
};

export default AnvisaForm;
