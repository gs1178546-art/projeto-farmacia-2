import { CarouselSlide } from '../types/carousel';

export const mockCarouselSlides: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'Cuidado Completo para Sua Saúde',
    subtitle: 'Medicamentos, vitaminas e dermocosméticos com entrega super rápida.',
    imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1200&auto=format&fit=crop&q=80',
    linkUrl: '/#produtos',
    backgroundColor: '#0f766e', // Teal 700
    active: true,
    order: 1
  },
  {
    id: 'slide-2',
    title: 'Programa de Fidelidade BioSaúde',
    subtitle: 'Cadastre-se e ganhe 5% de cashback em todas as suas compras na farmácia.',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=1200&auto=format&fit=crop&q=80',
    linkUrl: '/conta/fidelidade',
    backgroundColor: '#0369a1', // Sky 700
    active: true,
    order: 2
  }
];
