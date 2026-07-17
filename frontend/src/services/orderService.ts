import api from './api';
import { Order, OrderStatus } from '../types/order';
import { mockOrders } from '../mocks/orders';
import { delay } from '../lib/utils';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

// Banco em memória simulado para persistência de pedidos
let localOrders = [...mockOrders];

export async function getOrders(): Promise<Order[]> {
  if (USE_MOCK) {
    await delay(300);
    return localOrders;
  }
  const { data } = await api.get('/orders');
  return data;
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (USE_MOCK) {
    await delay(200);
    return localOrders.find((o) => o.id === id) || null;
  }
  const { data } = await api.get(`/orders/${id}`);
  return data;
}

export async function createOrder(orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  if (USE_MOCK) {
    await delay(600);
    const newOrder: Order = {
      ...orderData,
      id: `PED-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localOrders.unshift(newOrder);
    return newOrder;
  }
  const { data } = await api.post('/orders', orderData);
  return data;
}

export async function updateOrderStatusService(id: string, status: OrderStatus): Promise<Order> {
  if (USE_MOCK) {
    await delay(300);
    const orderIndex = localOrders.findIndex((o) => o.id === id);
    if (orderIndex === -1) throw new Error('Pedido não encontrado');
    const updated = {
      ...localOrders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    localOrders[orderIndex] = updated;
    return updated;
  }
  const { data } = await api.patch(`/orders/${id}/status`, { status });
  return data;
}
