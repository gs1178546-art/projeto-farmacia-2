'use client';

import React from 'react';
import { Layers, Plus, Trash2, Edit } from 'lucide-react';
import { CarouselSlide } from '../../../types/carousel';
import Button from '../../ui/Button';

interface CarouselEditorProps {
  slides: CarouselSlide[];
  onAddSlide: () => void;
  onEditSlide: (slide: CarouselSlide) => void;
  onDeleteSlide: (id: string) => void;
}

export const CarouselEditor: React.FC<CarouselEditorProps> = ({
  slides,
  onAddSlide,
  onEditSlide,
  onDeleteSlide
}) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Head line */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-5 h-5 text-teal-700" />
            Editor Visual do Carrossel de Banners
          </h2>
          <p className="text-xs text-slate-500">Configure os banners em destaque mostrados na página inicial da farmácia.</p>
        </div>
        <Button onClick={onAddSlide} className="rounded-xl flex items-center gap-1">
          <Plus className="w-4 h-4" /> Adicionar Banner
        </Button>
      </div>

      {/* Slide preview cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="flex flex-col border border-slate-150 rounded-2xl bg-white overflow-hidden shadow-2xs hover:shadow-xs transition-shadow relative group"
          >
            {/* Aspect image preview */}
            <div 
              className="w-full h-40 flex items-center px-6 relative"
              style={{
                backgroundColor: slide.backgroundColor || '#0f766e',
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.05)), url(${slide.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply'
              }}
            >
              <div className="text-white flex flex-col gap-1 max-w-[80%]">
                <span className="text-sm font-bold block">{slide.title}</span>
                {slide.subtitle && <p className="text-[10px] text-teal-100/90 font-medium line-clamp-1">{slide.subtitle}</p>}
              </div>

              {/* Status pill overlay */}
              <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold ${
                slide.active ? 'bg-emerald-500 text-white shadow-2xs' : 'bg-slate-350 text-slate-700'
              }`}>
                {slide.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            {/* Slide details/actions footer */}
            <div className="p-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Ordem: {slide.order}
              </span>

              <div className="flex gap-2">
                <Button 
                  onClick={() => onEditSlide(slide)}
                  variant="outline" 
                  size="sm" 
                  className="rounded-lg p-2 text-xs"
                >
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  onClick={() => onDeleteSlide(slide.id)}
                  variant="danger" 
                  size="sm" 
                  className="rounded-lg p-2 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CarouselEditor;
