export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  promoPrice?: number;
  image: string;
  category: string;
  requiresPrescription: boolean;
  stock: number;
  active: boolean;
  sku: string;
  ean?: string;
  registryNumber?: string; // Registro ANVISA se for medicamento
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  requiresPrescription?: boolean;
  onlyPromotions?: boolean;
}
