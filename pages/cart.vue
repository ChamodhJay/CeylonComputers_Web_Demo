<template>
  <div class="px-4">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>
    <div v-if="cartStore.items.length === 0" class="text-center py-8">
      <p class="text-xl text-gray-600">Your cart is empty</p>
      <NuxtLink to="/products" class="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Browse Products
      </NuxtLink>
    </div>
    <div v-else>
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <div v-for="item in cartStore.items" :key="item.id" class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b gap-4">
          <div class="flex items-center">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
            <div class="ml-4">
              <h3 class="text-lg font-semibold">{{ item.name }}</h3>
              <p class="text-gray-600">${{ item.price }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between sm:justify-end gap-4">
            <div class="flex items-center">
              <label class="sr-only" :for="'quantity-' + item.id">Quantity</label>
              <input 
                :id="'quantity-' + item.id"
                type="number" 
                v-model="item.quantity" 
                min="1" 
                @change="updateQuantity(item.id, item.quantity)"
                class="w-16 px-2 py-1 border rounded"
              >
            </div>
            <button @click="removeFromCart(item.id)" class="text-red-600 hover:text-red-800">
              <span class="sr-only">Remove item</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-6 flex flex-col sm:flex-row sm:justify-end items-center gap-4">
          <p class="text-xl font-bold">Total: ${{ cartStore.total.toFixed(2) }}</p>
          <button class="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, parseInt(quantity));
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};
</script>