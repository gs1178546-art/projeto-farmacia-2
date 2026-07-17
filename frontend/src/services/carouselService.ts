import api from './api';
import { CarouselSlide } from '../types/carousel';
import { mockCarouselSlides } from '../mocks/carouselSlides';
import { delay } from '../lib/utils';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

let currentSlides = [...mockCarouselSlides];

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  if (USE_MOCK) {
    await delay(200);
    return currentSlides.sort((a, b) => a.order - b.order);
  }
  const { data } = await api.get('/carousel');
  return data;
}

export async function saveCarouselSlides(slides: CarouselSlide[]): Promise<CarouselSlide[]> {
  if (USE_MOCK) {
    await delay(400);
    currentSlides = [...slides];
    return currentSlides;
  }
  const { data } = await api.post('/carousel', { slides });
  return data;
}
