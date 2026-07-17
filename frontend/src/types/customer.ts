export type UserRole = 'customer' | 'admin' | 'super_admin';

export interface Customer {
  id: string;
  storeId: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  role: UserRole;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  loyaltyBalance: number;
  totalSpent: number;
  ordersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loyaltyBalance: number;
  storeId: string;
  token?: string;
}
