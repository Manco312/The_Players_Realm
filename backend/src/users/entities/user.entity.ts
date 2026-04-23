export type Role = 'User' | 'Admin';

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: Role;
}
