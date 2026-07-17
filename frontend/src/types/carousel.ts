export interface CarouselSlide {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  backgroundColor?: string;
  active: boolean;
  order: number;
}
