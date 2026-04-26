// Made by: Santiago Manco

// External Imports
import axiosInstance from '@/api/axiosInstance';

// Internal Imports
import type { UserInterface } from '@/interfaces/UserInterface';

export class UserService {
  static async getUsers(): Promise<UserInterface[]> {
    const { data: users } = await axiosInstance.get<UserInterface[]>('/api/users');
    return users;
  }
}
