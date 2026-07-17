import { create } from 'zustand';
import { Order, OrderStatus } from '../types/order';
import { mockOrders } from '../mocks/orders';

interface OrdersState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addOrder: (order: Order) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: mockOrders,
  setOrders: (orders) => set({ orders }),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((o) => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o)
  })),
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  }))
}));
