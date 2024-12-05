import { defineStore } from 'pinia';

export const useFeedbackStore = defineStore('feedback', {
  state: () => ({
    feedbacks: []
  }),

  actions: {
    addFeedback(feedback) {
      this.feedbacks.push({
        id: Date.now(),
        ...feedback,
        createdAt: new Date()
      });
    }
  }
});