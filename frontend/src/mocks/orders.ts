import { Order } from '../types/order';

export const mockOrders: Order[] = [
  {
    id: 'PED-9831',
    storeId: 'store-1',
    customerId: 'cust-1',
    customerName: 'Carlos Silva',
    customerPhone: '(11) 98765-4321',
    items: [
      {
        productId: 'prod-1',
        name: 'Dipirona Monoidratada 500mg Medley',
        price: 12.90,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      },
      {
        productId: 'prod-4',
        name: 'Vitamina C 1000mg Redoxon',
        price: 24.90,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      }
    ],
    status: 'pending',
    subtotal: 50.70,
    deliveryFee: 7.00,
    discount: 5.00,
    total: 52.70,
    address: {
      street: 'Av. Paulista',
      number: '1000',
      complement: 'Apto 42',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      receiverName: 'Carlos Silva',
      receiverPhone: '(11) 98765-4321'
    },
    paymentMethod: 'mercado_pago',
    paymentStatus: 'paid',
    estimatedTime: 35,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min atrás
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 'PED-9830',
    storeId: 'store-1',
    customerId: 'cust-2',
    customerName: 'Mariana Santos',
    customerPhone: '(11) 99999-8888',
    items: [
      {
        productId: 'prod-3',
        name: 'Protetor Solar La Roche-Posay Anthelios SPF 60',
        price: 84.90,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      }
    ],
    status: 'preparing',
    subtotal: 84.90,
    deliveryFee: 7.00,
    discount: 0,
    total: 91.90,
    address: {
      street: 'Rua Augusta',
      number: '450',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01304-000',
      receiverName: 'Mariana Santos',
      receiverPhone: '(11) 99999-8888'
    },
    paymentMethod: 'card_on_delivery',
    paymentStatus: 'pending',
    estimatedTime: 40,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 min atrás
    updatedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  }
];
