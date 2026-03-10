// Made by: Santiago Manco

// Internal Imports
import type { UserInterface } from '@/interfaces/UserInterface';

export class UserService {
  static getTotalUsers(users: UserInterface[]): number {
    return users.length;
  }

  static getAdminUsers(users: UserInterface[]): UserInterface[] {
    return users.filter((user) => user.role === 'Admin');
  }
}
