'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product } from '../../../types/product';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const productSchema = z.object({
  name: z.string().min(3, 'Nome do produto obrigatório'),
  description: z.string().min(10, 'Descrição detalhada obrigatória'),
  price: z.preprocess((val) => Number(val), z.number().min(0.01, 'Preço deve ser maior que zero')),
  promoPrice: z.preprocess((val) => val ? Number(val) : undefined, z.number().min(0.01).optional()),
  image: z.string().url('Link de imagem inválido'),
  category: z.string().min(2, 'Categoria obrigatória'),
  requiresPrescription: z.boolean().default(false),
  stock: z.preprocess((val) => Number(val), z.number().min(0, 'Estoque inválido')),
  sku: z.string().min(3, 'SKU obrigatório'),
  ean: z.string().optional(),
  registryNumber: z.string().optional()
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  defaultValues?: Partial<Product>;
  isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, defaultValues, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ? {
      ...defaultValues,
      promoPrice: defaultValues.promoPrice || undefined
    } : undefined
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome do Produto"
          placeholder="Ex: Dipirona Monoidratada 500mg"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Categoria"
          placeholder="Ex: Medicamentos, Cosméticos"
          error={errors.category?.message}
          {...register('category')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700">Descrição Completa</label>
        <textarea
          placeholder="Descreva as indicações, contra-indicações e posologia..."
          rows={3}
          className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder:text-slate-400 ${
            errors.description ? 'border-red-500' : 'border-slate-200'
          }`}
          {...register('description')}
        />
        {errors.description && (
          <span className="text-[11px] font-medium text-red-500">{errors.description.message}</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Preço Original (R$)"
          type="number"
          step="0.01"
          placeholder="R$ 0.00"
          error={errors.price?.message}
          {...register('price')}
        />
        <Input
          label="Preço Promocional (Opcional)"
          type="number"
          step="0.01"
          placeholder="R$ 0.00"
          error={errors.promoPrice?.message}
          {...register('promoPrice')}
        />
        <Input
          label="Quantidade em Estoque"
          type="number"
          placeholder="Ex: 50"
          error={errors.stock?.message}
          {...register('stock')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Código SKU"
          placeholder="Ex: MED-DIP-500"
          error={errors.sku?.message}
          {...register('sku')}
        />
        <Input
          label="Código de Barras (EAN)"
          placeholder="Ex: 7891011121314"
          error={errors.ean?.message}
          {...register('ean')}
        />
        <Input
          label="Registro ANVISA (Medicamentos)"
          placeholder="Ex: 1.0181.0345.002-1"
          error={errors.registryNumber?.message}
          {...register('registryNumber')}
        />
      </div>

      <Input
        label="URL da Imagem do Produto"
        placeholder="https://exemplo.com/imagem.jpg"
        error={errors.image?.message}
        {...register('image')}
      />

      <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer mt-1">
        <input
          type="checkbox"
          className="rounded border-slate-350 text-teal-700 focus:ring-teal-500 w-4.5 h-4.5 cursor-pointer"
          {...register('requiresPrescription')}
        />
        Este produto exige receita médica controlada para ser vendido
      </label>

      <Button type="submit" isLoading={isLoading} className="w-full mt-3 rounded-xl">
        Salvar Produto
      </Button>
    </form>
  );
};

export default ProductForm;
