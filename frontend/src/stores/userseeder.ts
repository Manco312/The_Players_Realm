import type { UserInterface } from '@/interfaces/UserInterface';

export const userSeeder: UserInterface[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@games.com',
    role: 'Admin',
  },
  {
    id: 2,
    username: 'player1',
    password: '123456',
    email: 'player1@email.com',
    role: 'User',
  },
  {
    id: 3,
    username: 'player2',
    password: '123456',
    email: 'player2@email.com',
    role: 'User',
  },
];
