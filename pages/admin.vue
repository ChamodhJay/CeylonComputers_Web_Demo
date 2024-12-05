<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Orders Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
        <div v-if="orders.length === 0" class="text-gray-500">No orders yet</div>
        <div v-else class="space-y-4">
          <div v-for="order in orders" :key="order.id" class="border-b pb-4">
            <div class="flex justify-between items-center">
              <span class="font-medium">Order #{{ order.id }}</span>
              <span class="text-sm text-gray-500">{{ formatDate(order.date) }}</span>
            </div>
            <div class="text-sm text-gray-600">{{ order.status }}</div>
          </div>
        </div>
      </div>

      <!-- Service Bookings Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Service Bookings</h2>
        <div v-if="bookingStore.bookings.length === 0" class="text-gray-500">No bookings yet</div>
        <div v-else class="space-y-4">
          <div v-for="booking in bookingStore.bookings" :key="booking.id" class="border-b pb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium">{{ booking.serviceName }}</span>
              <span class="text-sm text-gray-500">{{ formatDate(booking.createdAt) }}</span>
            </div>
            <div class="text-sm mb-2">
              <p><strong>Customer:</strong> {{ booking.name }}</p>
              <p><strong>Email:</strong> {{ booking.email }}</p>
              <p><strong>Phone:</strong> {{ booking.phone }}</p>
              <p><strong>Preferred Date:</strong> {{ formatDate(booking.date) }}</p>
              <p><strong>Status:</strong> {{ booking.status }}</p>
            </div>
            <button
              v-if="booking.status === 'pending'"
              @click="confirmBooking(booking.id)"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>

      <!-- Messages Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Recent Messages</h2>
        <div v-if="chatStore.messages.length === 0" class="text-gray-500">No messages yet</div>
        <div v-else class="space-y-4">
          <div v-for="message in chatStore.messages" :key="message.id" class="border-b pb-4">
            <div class="flex justify-between items-center">
              <span class="font-medium">{{ message.sender }}</span>
              <span class="text-sm text-gray-500">{{ formatDate(message.timestamp) }}</span>
            </div>
            <div class="text-sm text-gray-600">{{ message.content }}</div>
          </div>
        </div>
      </div>

      <!-- Feedback Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Recent Feedback</h2>
        <div v-if="feedbackStore.feedbacks.length === 0" class="text-gray-500">No feedback yet</div>
        <div v-else class="space-y-4">
          <div v-for="feedback in feedbackStore.feedbacks" :key="feedback.id" class="border-b pb-4">
            <div class="flex items-center mb-2">
              <div class="flex-1">
                <span class="font-medium">{{ feedback.userName }}</span>
                <div class="flex items-center">
                  <span v-for="i in 5" :key="i" class="text-yellow-400">
                    ★
                  </span>
                </div>
              </div>
              <span class="text-sm text-gray-500">{{ formatDate(feedback.createdAt) }}</span>
            </div>
            <p class="text-sm text-gray-600">{{ feedback.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useChatStore } from '~/stores/chat';
import { useFeedbackStore } from '~/stores/feedback';
import { useBookingStore } from '~/stores/booking';
import { format } from 'date-fns';

const authStore = useAuthStore();
const chatStore = useChatStore();
const feedbackStore = useFeedbackStore();
const bookingStore = useBookingStore();

// Simulated orders data
const orders = ref([
  {
    id: 1,
    date: new Date(),
    status: 'Processing',
    total: 299.99
  }
]);

const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

const confirmBooking = async (bookingId) => {
  await bookingStore.confirmBooking(bookingId);
};

// Redirect if not admin
onMounted(() => {
  if (!authStore.isAdmin) {
    navigateTo('/login');
  }
});
</script>