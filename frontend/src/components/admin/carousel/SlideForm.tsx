'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CarouselSlide } from '../../../types/carousel';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const slideSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  subtitle: z.string().optional(),
  imageUrl: z.string().url('URL da imagem inválida'),
  linkUrl: z.string().optional(),
  backgroundColor: z.string().min(4, 'Código hexadecimal de cor inválido (Ex: #0f766e)'),
  order: z.preprocess((val) => Number(val), z.number().min(1, 'Ordem deve ser maior que zero')),
  active: z.boolean().default(true)
});

type SlideFormData = z.infer<typeof slideSchema>;

interface SlideFormProps {
  onSubmit: (data: SlideFormData) => void;
  defaultValues?: Partial<CarouselSlide>;
}

export const SlideForm: React.FC<SlideFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SlideFormData>({
    resolver: zodResolver(slideSchema),
    defaultValues: defaultValues ? {
      ...defaultValues,
      subtitle: defaultValues.subtitle || undefined,
      linkUrl: defaultValues.linkUrl || undefined
    } : undefined
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Título do Banner"
          placeholder="Ex: Cuidado Completo para Sua Saúde"
          error={errors.title?.message}
          {...register('title')}
        />
        <Input
          label="Subtítulo do Banner (Opcional)"
          placeholder="Ex: Medicamentos e vitaminas com entrega grátis."
          error={errors.subtitle?.message}
          {...register('subtitle')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="URL da Imagem de Fundo"
          placeholder="https://exemplo.com/fundo.jpg"
          error={errors.imageUrl?.message}
          {...register('imageUrl')}
        />
        <Input
          label="Cor de Fundo (Hexadecimal)"
          placeholder="Ex: #0f766e"
          error={errors.backgroundColor?.message}
          {...register('backgroundColor')}
        />
        <Input
          label="Ordem de Exibição"
          type="number"
          placeholder="Ex: 1, 2"
          error={errors.order?.message}
          {...register('order')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Link URL de Redirecionamento (Opcional)"
          placeholder="Ex: /#produtos"
          error={errors.linkUrl?.message}
          {...register('linkUrl')}
        />
        
        <div className="flex flex-col justify-end pb-2">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-705 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-slate-350 text-teal-700 focus:ring-teal-500 w-4.5 h-4.5 cursor-pointer"
              {...register('active')}
            />
            Banner Ativo (Disponível na home)
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full mt-2 rounded-xl">
        Salvar Slide
      </Button>
    </form>
  );
};

export default SlideForm;
