// Made by: Santiago Manco
import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LandingView from '@/views/LandingView.vue';
import LoginView from '@/views/LoginView.vue';
import { useAuthStore } from '@/stores/authstore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { title: 'Landing', layout: 'landing' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login', layout: 'landing' },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home', requiresAuth: true },
    },
  ],
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
