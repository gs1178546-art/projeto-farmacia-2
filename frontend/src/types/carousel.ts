export interface CarouselSlide {
  id: string;
  storeId: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  gradientFrom: string;
  gradientTo: string;
  imageUrl?: string;
  icon?: string; // lucide icon name
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
