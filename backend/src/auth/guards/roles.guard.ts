// Author: Santiago Manco

// External Imports
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Internal Imports
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<{
      user?: {
        role?: string;
      };
    }>();
    const hasRole = requiredRoles.includes(request.user?.role ?? '');

    if (!hasRole) throw new ForbiddenException('Insufficient permissions');

    return true;
  }
}
