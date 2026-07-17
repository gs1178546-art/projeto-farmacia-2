'use client';

import React, { useEffect, useState } from 'react';
import { getCarouselSlides, saveCarouselSlides } from '../../../services/carouselService';
import { CarouselSlide } from '../../../types/carousel';
import CarouselEditor from '../../../components/admin/carousel/CarouselEditor';
import SlideForm from '../../../components/admin/carousel/SlideForm';
import Modal from '../../../components/ui/Modal';
import { useToast } from '../../../components/ui/Toast';
import Spinner from '../../../components/ui/Spinner';

export default function AdminCarouselPage() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal editors state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<CarouselSlide | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await getCarouselSlides();
      setSlides(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleCreateOrUpdateSlide = async (data: any) => {
    try {
      let updatedSlides = [...slides];
      if (selectedSlide) {
        // Mode: Edit
        updatedSlides = slides.map((s) => s.id === selectedSlide.id ? { ...s, ...data } : s);
        toast({
          type: 'success',
          title: 'Slide Salvo',
          description: 'As alterações do banner foram salvas.'
        });
      } else {
        // Mode: Create
        const newSlide: CarouselSlide = {
          ...data,
          id: `slide-${Math.random().toString(36).substr(2, 9)}`
        };
        updatedSlides.push(newSlide);
        toast({
          type: 'success',
          title: 'Banner Criado',
          description: 'O novo banner foi adicionado à sequência.'
        });
      }
      
      await saveCarouselSlides(updatedSlides);
      setIsModalOpen(false);
      setSelectedSlide(null);
      await load();
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível salvar a sequência de banners.'
      });
    }
  };

  const handleEditClick = (slide: CarouselSlide) => {
    setSelectedSlide(slide);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm('Deseja realmente remover este banner?')) return;
    try {
      const updatedSlides = slides.filter((s) => s.id !== id);
      await saveCarouselSlides(updatedSlides);
      toast({
        type: 'success',
        title: 'Banner Removido',
        description: 'A campanha foi removida do carrossel.'
      });
      await load();
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível remover o slide.'
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xs">
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <CarouselEditor
          slides={slides}
          onAddSlide={() => { setSelectedSlide(null); setIsModalOpen(true); }}
          onEditSlide={handleEditClick}
          onDeleteSlide={handleDeleteClick}
        />
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => { setIsModalOpen(false); setSelectedSlide(null); }}
          title={selectedSlide ? 'Editar Banner' : 'Criar Novo Banner'}
          size="lg"
        >
          <SlideForm
            onSubmit={handleCreateOrUpdateSlide}
            defaultValues={selectedSlide || undefined}
          />
        </Modal>
      )}
    </div>
  );
}
