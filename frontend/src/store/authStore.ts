import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from '@/types/customer';

interface AuthStore {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateBalance: (balance: number) => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: (user) => set({ user }),

      logout: () => set({ user: null }),

      updateBalance: (balance) => {
        const { user } = get();
        if (user) set({ user: { ...user, loyaltyBalance: balance } });
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin' || user?.role === 'super_admin';
      },
    }),
    { name: 'farmacia-auth' }
  )
);
