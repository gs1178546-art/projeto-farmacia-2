import { useOrdersStore } from '../store/ordersStore';
import { getOrders, getOrderById, createOrder, updateOrderStatusService } from '../services/orderService';
import { Order, OrderStatus } from '../types/order';

export function useOrders() {
  const storeOrders = useOrdersStore((state) => state.orders);
  const setStoreOrders = useOrdersStore((state) => state.setOrders);
  const updateStoreStatus = useOrdersStore((state) => state.updateOrderStatus);
  const addStoreOrder = useOrdersStore((state) => state.addOrder);

  const fetchOrders = async () => {
    const data = await getOrders();
    setStoreOrders(data);
    return data;
  };

  const fetchOrderById = async (id: string) => {
    return await getOrderById(id);
  };

  const placeOrder = async (orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const order = await createOrder(orderData);
    addStoreOrder(order);
    return order;
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    const updated = await updateOrderStatusService(id, status);
    updateStoreStatus(id, status);
    return updated;
  };

  return {
    orders: storeOrders,
    fetchOrders,
    fetchOrderById,
    placeOrder,
    updateOrderStatus
  };
}
