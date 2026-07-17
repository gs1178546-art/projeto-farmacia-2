export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface DeliveryAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  receiverName: string;
  receiverPhone: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  storeId: string;           // Multi-tenant
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;          // Desconto do cashback ou cupom
  total: number;
  address: DeliveryAddress;
  paymentMethod: 'mercado_pago' | 'cash' | 'card_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed';
  estimatedTime?: number;    // Minutos estimados para entrega
  createdAt: string;
  updatedAt: string;
}
