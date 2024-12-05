<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md">
      <div class="h-[600px] flex flex-col">
        <!-- Chat Messages -->
        <div class="flex-1 p-4 overflow-y-auto">
          <div v-for="message in chatStore.messages" :key="message.id" 
               :class="['mb-4', message.sender === 'user' ? 'text-right' : 'text-left']">
            <div :class="['inline-block max-w-[70%] rounded-lg p-3', 
                         message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100']">
              <p>{{ message.content }}</p>
              <span class="text-xs opacity-75">{{ formatDate(message.timestamp) }}</span>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="border-t p-4">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatStore } from '~/stores/chat';
import { useAuthStore } from '~/stores/auth';
import { format } from 'date-fns';

const chatStore = useChatStore();
const authStore = useAuthStore();
const newMessage = ref('');

const formatDate = (date) => {
  return format(new Date(date), 'HH:mm');
};

const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatStore.sendMessage({
      content: newMessage.value,
      sender: authStore.user ? 'user' : 'guest'
    });
    newMessage.value = '';
  }
};
</script>