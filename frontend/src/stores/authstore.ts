// Made by: Santiago Manco
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { UserInterface } from '@/interfaces/UserInterface';
import AuthService from '@/services/AuthService';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(null);

  const isAuthenticated = computed(() => currentUser.value !== null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = await AuthService.login(email, password);

    if (!user) {
      return false;
    }

    currentUser.value = user;
    return true;
  };

  const logout = () => {
    AuthService.logout();
    currentUser.value = null;
  };

  const restoreSession = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const user = await AuthService.getMe(token);
    if (user) {
      currentUser.value = user;
    } else {
      localStorage.removeItem('token');
    }
  };

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    restoreSession,
  };
});
