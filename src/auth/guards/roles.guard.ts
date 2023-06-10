import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../roles/decorators/roles.decorator';
import { MIN_REQUIRED_ROLES, Role } from '../../roles/enums/role.enum';
import { MissingRolesException } from '../../roles/exception/missing-roles.exception';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    let requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) requiredRoles = MIN_REQUIRED_ROLES;
    else if (requiredRoles.includes(Role.ALL)) return true;

    const user = context.getArgs()[0].user;
    const allowed = requiredRoles.some((role) => user.roles?.includes(role));

    if (!allowed) throw MissingRolesException.for(requiredRoles);
    return allowed;
  }
}

