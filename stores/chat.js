import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    activeChats: []
  }),

  actions: {
    sendMessage(message) {
      const newMessage = {
        id: Date.now(),
        content: message.content,
        sender: message.sender,
        timestamp: new Date(),
        read: false
      };
      this.messages.push(newMessage);
    },

    markAsRead(messageId) {
      const message = this.messages.find(m => m.id === messageId);
      if (message) {
        message.read = true;
      }
    }
  }
});