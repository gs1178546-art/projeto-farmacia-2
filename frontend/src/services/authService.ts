import api from './api';
import { mockCustomers } from '../mocks/customers';
import { Customer } from '../types/customer';
import { delay } from '../lib/utils';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false'; // Default to true

export async function loginCustomer(email: string, document: string): Promise<{ customer: Customer; token: string }> {
  if (USE_MOCK) {
    await delay(500);
    const docClean = document.replace(/\D/g, '');
    const found = mockCustomers.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() || c.document.replace(/\D/g, '') === docClean
    );

    if (found) {
      return { customer: found, token: 'mock-jwt-token-12345' };
    }
    
    // Auto-cadastro mock se não achar
    const newCust: Customer = {
      id: `cust-${Math.random().toString(36).substr(2, 9)}`,
      name: email.split('@')[0],
      email,
      phone: '(11) 99999-9999',
      document: document || '000.000.000-00',
      cashbackBalance: 10.00, // Cashback inicial de boas-vindas
      createdAt: new Date().toISOString()
    };
    return { customer: newCust, token: 'mock-jwt-token-new' };
  }

  const { data } = await api.post('/auth/login', { email, document });
  return data;
}

export async function loginAdmin(password: string): Promise<{ token: string }> {
  if (USE_MOCK) {
    await delay(400);
    if (password === 'admin') {
      return { token: 'mock-jwt-admin-token' };
    }
    throw new Error('Senha administrativa incorreta');
  }

  const { data } = await api.post('/auth/admin', { password });
  return data;
}
