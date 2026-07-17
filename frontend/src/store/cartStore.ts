import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // SKU or Product ID
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  requiresPrescription: boolean;
}

interface CartState {
  items: CartItem[];
  addItem: (product: { id: string; name: string; price: number; image: string; requiresPrescription: boolean }, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.productId === product.id);
          if (existingIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += qty;
            return { items: updatedItems };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: qty,
                image: product.image,
                requiresPrescription: product.requiresPrescription
              }
            ]
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.productId !== productId) };
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            )
          };
        });
      },
      clearCart: () => set({ items: [] }),
      subtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'biosaude-cart-storage'
    }
  )
);
