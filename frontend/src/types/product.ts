export type ProductCategory =
  | 'medicamentos'
  | 'cuidados'
  | 'beleza'
  | 'bebe'
  | 'vitaminas'
  | 'suplementos';

export type ProductType = 'generico' | 'referencia' | 'outros';

export interface Product {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string;
  quantity: string; // "10 Comprimidos", "250ml"
  brand: string;
  category: ProductCategory;
  type: ProductType;
  dosage: string;
  priceOriginal: number;
  priceCurrent: number;
  discount: number; // percentage
  image: string;
  images?: string[];
  stock: number;
  active: boolean;
  leve3Pague2?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: ProductCategory | 'todos';
  search?: string;
  types?: ProductType[];
  brands?: string[];
  dosages?: string[];
  maxPrice?: number;
  minPrice?: number;
}
