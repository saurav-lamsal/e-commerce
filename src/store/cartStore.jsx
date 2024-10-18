import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("items")) || [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state?.cart?.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return {
          cart: state.cart.map((item) => {
            if (item.id === product.id)
              return { ...item, quantity: item.quantity + 1 };
            else return { ...item };
          }),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    })),
  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ),
    })),
}));

useCartStore.subscribe((state) => {
  if (state.cart.length)
    localStorage.setItem("items", JSON.stringify(state.cart));
});
