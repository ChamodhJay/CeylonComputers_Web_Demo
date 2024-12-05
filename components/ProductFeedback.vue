<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Customer Feedback</h2>
    
    <!-- Feedback Form -->
    <div v-if="!hasSubmittedFeedback" class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-lg font-medium mb-4">Leave Your Feedback</h3>
      <form @submit.prevent="submitFeedback">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div class="flex gap-2">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="rating = star"
              class="text-2xl focus:outline-none"
              :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'"
            >
              ★
            </button>
          </div>
        </div>
        
        <div class="mb-4">
          <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            id="comment"
            v-model="comment"
            rows="3"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </form>
    </div>

    <!-- Feedback List -->
    <div class="space-y-4">
      <div v-for="feedback in feedbackStore.feedbacks" :key="feedback.id" class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h4 class="font-medium">{{ feedback.userName }}</h4>
            <div class="flex text-yellow-400">
              <span v-for="star in feedback.rating" :key="star">★</span>
            </div>
          </div>
          <span class="text-sm text-gray-500">{{ formatDate(feedback.createdAt) }}</span>
        </div>
        <p class="text-gray-600">{{ feedback.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFeedbackStore } from '~/stores/feedback';
import { format } from 'date-fns';

const feedbackStore = useFeedbackStore();
const rating = ref(0);
const comment = ref('');
const hasSubmittedFeedback = ref(false);

const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

const submitFeedback = () => {
  if (rating.value === 0) {
    alert('Please select a rating');
    return;
  }

  feedbackStore.addFeedback({
    rating: rating.value,
    comment: comment.value,
    userName: 'Anonymous User', // Replace with actual user name when authentication is implemented
  });

  hasSubmittedFeedback.value = true;
  rating.value = 0;
  comment.value = '';
};
</script>