import { Role } from '../entities/user.entity';

export class UpdateUserDto {
  username?: string;
  password?: string;
  email?: string;
  role?: Role;
}
