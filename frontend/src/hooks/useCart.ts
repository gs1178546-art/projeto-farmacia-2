import { useCartStore } from '../store/cartStore';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.subtotal)();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const hasPrescriptionItems = items.some((item) => item.requiresPrescription);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    hasPrescriptionItems
  };
}
