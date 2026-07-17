import { Customer } from '../types/customer';

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    cashbackBalance: 24.50,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'cust-2',
    name: 'Mariana Santos',
    email: 'mariana.santos@email.com',
    phone: '(11) 99999-8888',
    document: '987.654.321-11',
    cashbackBalance: 12.00,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];
