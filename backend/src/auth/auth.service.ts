import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(createAuthDto: CreateAuthDto) {
    const user = this.usersService.findByEmail(createAuthDto.email);
    if (!user || user.password !== createAuthDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { userId: user.id, username: user.username, role: user.role };
  }

  register(createAuthDto: CreateAuthDto & { username: string }) {
    return this.usersService.create({
      username: createAuthDto.username,
      email: createAuthDto.email,
      password: createAuthDto.password,
      role: 'User',
    });
  }
}
