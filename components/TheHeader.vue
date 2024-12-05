<template>
  <header class="bg-gray-800 text-white">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-bold">TechRepair Hub</NuxtLink>
          <button @click="toggleMenu" class="sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div :class="['sm:flex sm:items-center sm:space-x-6', isMenuOpen ? 'block' : 'hidden']">
          <NuxtLink to="/products" class="block py-2 sm:py-0 hover:text-gray-300">Products</NuxtLink>
          <NuxtLink to="/services" class="block py-2 sm:py-0 hover:text-gray-300">Repair Services</NuxtLink>
          <NuxtLink v-if="authStore.isAdmin" to="/admin" class="block py-2 sm:py-0 hover:text-gray-300">Admin Panel</NuxtLink>
          <NuxtLink to="/chat" class="block py-2 sm:py-0 hover:text-gray-300">Chat</NuxtLink>
          <NuxtLink to="/cart" class="relative block py-2 sm:py-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {{ cartCount }}
            </span>
          </NuxtLink>
          <button v-if="!authStore.user" @click="navigateToLogin" class="block py-2 sm:py-0 hover:text-gray-300">
            Login
          </button>
          <button v-else @click="logout" class="block py-2 sm:py-0 hover:text-gray-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMenuOpen = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();
const { cartCount } = storeToRefs(cartStore);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navigateToLogin = () => {
  router.push('/login');
};

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>