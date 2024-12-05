export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  
  if (to.path === '/admin' && !authStore.isAdmin) {
    return navigateTo('/login');
  }
});