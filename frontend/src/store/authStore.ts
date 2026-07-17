import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer } from '../types/customer';

interface AuthState {
  user: Customer | null;
  isAdmin: boolean;
  token: string | null;
  login: (customer: Customer, token: string) => void;
  loginAsAdmin: (token: string) => void;
  logout: () => void;
  updateCashbackBalance: (amount: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,
      token: null,
      login: (customer, token) => set({ user: customer, isAdmin: false, token }),
      loginAsAdmin: (token) => set({ user: null, isAdmin: true, token }),
      logout: () => set({ user: null, isAdmin: false, token: null }),
      updateCashbackBalance: (amount) => set((state) => {
        if (!state.user) return {};
        return {
          user: {
            ...state.user,
            cashbackBalance: amount
          }
        };
      })
    }),
    {
      name: 'biosaude-auth-storage'
    }
  )
);
