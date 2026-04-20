// Made by: Santiago Manco

// Internal Imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore.js';

export default class AuthService {
  public static login(email: string, password: string): UserInterface | null {
    const userStore = useUserStore();

    const user = userStore.users.find((user) => user.email === email && user.password === password);

    return user ?? null;
  }
}
