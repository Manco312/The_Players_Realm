// Made by: Santiago Manco
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { UserInterface } from '@/interfaces/UserInterface';
import AuthService from '@/services/AuthService';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(null);

  const isAuthenticated = computed(() => currentUser.value !== null);

  const login = (email: string, password: string): boolean => {
    const user = AuthService.login(email, password);

    if (!user) {
      return false;
    }

    currentUser.value = user;
    return true;
  };

  const logout = () => {
    currentUser.value = null;
  };

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };
});
