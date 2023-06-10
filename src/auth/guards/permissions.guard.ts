import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS_KEY } from '../../permissions/decorators/permissions.decorator';
import { MissingPermissionsException } from '../../permissions/exception/missing-permissions.exception';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  hasPermission = (requiredPermissions: string[], userPermissions: string[]) =>
    requiredPermissions.every((requiredPermission) =>
      userPermissions.includes(requiredPermission),
    );

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

    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    const userPermissions = context.getArgs()[0].user.permissions;
    if (!requiredPermissions) {
      return true;
    }

    const allowed = this.hasPermission(requiredPermissions, userPermissions);

    if (!allowed) throw MissingPermissionsException.for(requiredPermissions);
    return allowed;
  }
}

