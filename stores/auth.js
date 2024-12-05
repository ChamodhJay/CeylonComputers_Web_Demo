import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAdmin: false,
  }),

  actions: {
    login(credentials) {
      // Simulate login - Replace with actual API call
      if (
        credentials.email === "admin@techrepair.com" &&
        credentials.password === "admin123"
      ) {
        this.user = {
          id: 1,
          email: credentials.email,
          name: "Admin User",
        };
        this.isAdmin = true;
        return true;
      }
      return false;
    },

    logout() {
      this.user = null;
      this.isAdmin = false;
    },
  },
});
