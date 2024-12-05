<template>
  <div class="px-4">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Our Products</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="relative pb-[56.25%]">
          <img :src="product.image" :alt="product.name" class="absolute top-0 left-0 w-full h-full object-cover">
        </div>
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span class="text-lg font-bold">${{ product.price }}</span>
            <button @click="addToCart(product)" class="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();

const products = [
  {
    id: 1,
    name: 'Gaming PC Bundle',
    description: 'High-performance gaming PC with RGB lighting',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard with Cherry MX switches',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    description: 'High-DPI gaming mouse with programmable buttons',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>