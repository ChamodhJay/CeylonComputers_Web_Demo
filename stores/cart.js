import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  getters: {
    cartCount: (state) => state.items.length,
    total: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    }
  }
});