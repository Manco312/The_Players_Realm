// Made by: Santiago Manco
import type { Role } from '@/types/UserRole';

export interface UserInterface {
  id: number;
  username: string;
  password?: string;
  email: string;
  role: Role;
}
