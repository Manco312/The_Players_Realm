// Made by: Santiago Manco
import type { UserInterface } from '@/interfaces/UserInterface';

function getTotalUsers(users: UserInterface[]): number {
  return users.length;
}

function getAdminUsers(users: UserInterface[]): UserInterface[] {
  return users.filter((user) => user.role === 'Admin');
}

export default {
  getTotalUsers,
  getAdminUsers,
};
