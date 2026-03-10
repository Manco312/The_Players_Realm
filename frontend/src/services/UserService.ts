// Made by: Santiago Manco

// Internal Imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/userstore';

export class UserService {
  static getUsers(): UserInterface[] {
    return useUserStore().users;
  }

  static getTotalUsers(): number {
    return useUserStore().users.length;
  }

  static getAdminUsers(): UserInterface[] {
    return useUserStore().users.filter((user) => user.role === 'Admin');
  }
}
