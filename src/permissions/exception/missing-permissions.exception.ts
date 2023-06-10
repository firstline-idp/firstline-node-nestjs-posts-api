import { ForbiddenException } from '@nestjs/common';

export class MissingPermissionsException extends ForbiddenException {
  static for(requiredPermissions: string[]): MissingPermissionsException {
    return new MissingPermissionsException(
      `User does not have the necessary permission(s) '${requiredPermissions}'!`,
    );
  }
}

