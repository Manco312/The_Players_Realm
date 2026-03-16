// Made by: Santiago Manco
import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LandingView from '@/views/LandingView.vue';
import LoginView from '@/views/LoginView.vue';
import StudioFormView from '@/views/StudioFormView.vue';
import StudiosMapView from '@/views/StudiosMapView.vue';
import StudiosListView from '@/views/StudiosListView.vue';
import VideogameDetailView from '@/views/VideogameDetailView.vue';
import VideogameFormView from '@/views/VideogameFormView.vue';
import VideogamesListView from '@/views/VideogamesListView.vue';
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
    {
      path: '/videogames',
      name: 'videogames',
      component: VideogamesListView,
      meta: { title: 'Videogames List', requiresAuth: true },
    },
    {
      path: '/videogames/:id',
      name: 'videogames-detail',
      component: VideogameDetailView,
      meta: { title: 'Videogame Detail', requiresAuth: true },
    },
    {
      path: '/videogames/create',
      name: 'videogames-create',
      component: VideogameFormView,
      meta: { title: 'Create Videogame', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/videogames/edit/:id',
      name: 'videogames-edit',
      component: VideogameFormView,
      meta: { title: 'Edit Videogame', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/studios',
      name: 'studios',
      component: StudiosListView,
      meta: { title: 'Studios List', requiresAuth: true },
    },
    {
      path: '/studios/create',
      name: 'studios-create',
      component: StudioFormView,
      meta: { title: 'Create Studio', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/studios/edit/:id',
      name: 'studios-edit',
      component: StudioFormView,
      meta: { title: 'Edit Studio', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/studios/map',
      name: 'studios-map',
      component: StudiosMapView,
      meta: { title: 'Studio Map', requiresAuth: true },
    },
  ],
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'login' });
  } else if (to.meta.requiresAdmin && authStore.currentUser?.role !== 'Admin') {
    // Redirect to home if not admin
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
