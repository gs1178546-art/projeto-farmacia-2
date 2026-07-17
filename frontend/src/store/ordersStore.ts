import { create } from 'zustand';
import { Order, OrderStatus } from '@/types/order';
import { mockOrders } from '@/mocks/orders';

interface OrdersStore {
  orders: Order[];
  newOrderAlert: Order | null;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  dismissAlert: () => void;
  getPendingOrders: () => Order[];
  getActiveOrders: () => Order[];
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: mockOrders,
  newOrderAlert: null,

  setOrders: (orders) => set({ orders }),

  addOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders],
      newOrderAlert: order,
    }));
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? { ...o, status, updatedAt: new Date().toISOString() }
          : o
      ),
    }));
  },

  dismissAlert: () => set({ newOrderAlert: null }),

  getPendingOrders: () => get().orders.filter((o) => o.status === 'pending'),

  getActiveOrders: () =>
    get().orders.filter((o) =>
      ['accepted', 'preparing', 'shipped'].includes(o.status)
    ),
}));
