import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '@/views/LandingView.vue';
import LoginView from '@/views/LoginView.vue';

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
  ],
});

export default router;
