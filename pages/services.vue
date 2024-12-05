<template>
  <div class="px-4">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Repair Services</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="service in services" :key="service.id" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-2">{{ service.name }}</h2>
        <p class="text-gray-600 mb-4">{{ service.description }}</p>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span class="text-lg font-bold">Starting from ${{ service.price }}</span>
          <button 
            @click="openBookingModal(service)"
            class="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>

    <BookingModal 
      v-if="isBookingModalOpen"
      :is-open="isBookingModalOpen"
      :service="selectedService"
      @close="closeBookingModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BookingModal from '~/components/BookingModal.vue';

const isBookingModalOpen = ref(false);
const selectedService = ref(null);

const services = [
  {
    id: 1,
    name: 'Screen Repair',
    description: 'Professional screen replacement for smartphones and tablets',
    price: 79.99
  },
  {
    id: 2,
    name: 'Battery Replacement',
    description: 'Battery replacement service with genuine parts',
    price: 49.99
  },
  {
    id: 3,
    name: 'PC Repair',
    description: 'Diagnostic and repair services for desktop computers',
    price: 89.99
  },
  {
    id: 4,
    name: 'Data Recovery',
    description: 'Professional data recovery from damaged devices',
    price: 129.99
  },
  {
    id: 5,
    name: 'Virus Removal',
    description: 'Complete virus and malware removal service',
    price: 69.99
  },
  {
    id: 6,
    name: 'Hardware Upgrade',
    description: 'Professional installation of new hardware components',
    price: 99.99
  }
];

const openBookingModal = (service) => {
  selectedService.value = service;
  isBookingModalOpen.value = true;
};

const closeBookingModal = () => {
  isBookingModalOpen.value = false;
  selectedService.value = null;
};
</script>