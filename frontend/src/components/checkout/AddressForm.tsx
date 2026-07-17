'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';

const addressSchema = z.object({
  receiverName: z.string().min(3, 'Nome do recebedor obrigatório'),
  receiverPhone: z.string().min(10, 'Telefone de contato inválido'),
  zipCode: z.string().min(8, 'CEP é obrigatório'),
  street: z.string().min(3, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado (UF) é obrigatório')
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-1">
        📍 Informações de Entrega
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome do Recebedor"
          placeholder="Ex: Carlos Silva"
          error={errors.receiverName?.message}
          {...register('receiverName')}
        />
        <Input
          label="Telefone de Contato"
          placeholder="Ex: (11) 98765-4321"
          error={errors.receiverPhone?.message}
          {...register('receiverPhone')}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Input
            label="CEP"
            placeholder="00000-000"
            error={errors.zipCode?.message}
            {...register('zipCode')}
          />
        </div>
        <div className="col-span-2">
          <Input
            label="Rua / Logradouro"
            placeholder="Av. Paulista"
            error={errors.street?.message}
            {...register('street')}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Número"
          placeholder="1000"
          error={errors.number?.message}
          {...register('number')}
        />
        <div className="col-span-2">
          <Input
            label="Complemento (Opcional)"
            placeholder="Apto 42, Bloco B"
            error={errors.complement?.message}
            {...register('complement')}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Bairro"
          placeholder="Bela Vista"
          error={errors.neighborhood?.message}
          {...register('neighborhood')}
        />
        <Input
          label="Cidade"
          placeholder="São Paulo"
          error={errors.city?.message}
          {...register('city')}
        />
        <Input
          label="Estado"
          placeholder="SP"
          error={errors.state?.message}
          {...register('state')}
        />
      </div>

      <Button type="submit" className="w-full mt-2 rounded-xl">
        Prosseguir para Pagamento
      </Button>
    </form>
  );
};

export default AddressForm;
