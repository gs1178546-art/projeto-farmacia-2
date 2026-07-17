import api from './api';
import { Product, ProductFilters } from '../types/product';
import { mockProducts } from '../mocks/products';
import { delay } from '../lib/utils';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

// Simulação de banco local em memória para CRUD do Admin
let localProducts = [...mockProducts];

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  if (USE_MOCK) {
    await delay(300);
    let result = [...localProducts];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters?.requiresPrescription !== undefined) {
      result = result.filter((p) => p.requiresPrescription === filters.requiresPrescription);
    }

    if (filters?.onlyPromotions) {
      result = result.filter((p) => p.promoPrice !== undefined && p.promoPrice < p.price);
    }

    return result;
  }

  const { data } = await api.get('/products', { params: filters });
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    await delay(200);
    return localProducts.find((p) => p.slug === slug) || null;
  }

  const { data } = await api.get(`/products/${slug}`);
  return data;
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  if (USE_MOCK) {
    await delay(400);
    const newProd: Product = {
      ...product,
      id: `prod-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localProducts.unshift(newProd);
    return newProd;
  }

  const { data } = await api.post('/products', product);
  return data;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  if (USE_MOCK) {
    await delay(450);
    const index = localProducts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');
    const updated = {
      ...localProducts[index],
      ...product,
      updatedAt: new Date().toISOString()
    };
    localProducts[index] = updated;
    return updated;
  }

  const { data } = await api.put(`/products/${id}`, product);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  if (USE_MOCK) {
    await delay(300);
    localProducts = localProducts.filter((p) => p.id !== id);
    return;
  }

  await api.delete(`/products/${id}`);
}
