export const STORE_ID = 'store_1';
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

export const ADMIN_EMAIL = 'admin@biosaude.com';
export const ADMIN_PASSWORD = 'admin123'; // Only for mock mode

export const PRODUCT_CATEGORIES = [
  { value: 'todos', label: 'Todos' },
  { value: 'medicamentos', label: 'Medicamentos' },
  { value: 'cuidados', label: 'Cuidados Diários' },
  { value: 'beleza', label: 'Beleza' },
  { value: 'bebe', label: 'Mamãe e Bebê' },
  { value: 'vitaminas', label: 'Vitaminas' },
  { value: 'suplementos', label: 'Suplementos' },
] as const;

export const PRODUCT_TYPES = [
  { value: 'generico', label: 'Genérico' },
  { value: 'referencia', label: 'Referência' },
  { value: 'outros', label: 'Outros' },
] as const;

export const ORDER_STATUS_STEPS = [
  { key: 'pending', label: 'Pedido Recebido', icon: 'clock' },
  { key: 'accepted', label: 'Aceito', icon: 'check-circle' },
  { key: 'preparing', label: 'Em Preparação', icon: 'package' },
  { key: 'shipped', label: 'Saiu para Entrega', icon: 'truck' },
  { key: 'delivered', label: 'Entregue', icon: 'map-pin' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'mercado_pago', label: 'Mercado Pago (Cartão/Pix)', icon: 'credit-card' },
  { value: 'cash', label: 'Dinheiro na Entrega', icon: 'banknote' },
  { value: 'card_on_delivery', label: 'Cartão na Entrega', icon: 'credit-card' },
] as const;
