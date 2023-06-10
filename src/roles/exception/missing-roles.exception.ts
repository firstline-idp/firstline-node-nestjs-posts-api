import { ForbiddenException } from '@nestjs/common';

export class MissingRolesException extends ForbiddenException {
  static for(requiredRoles: string[]): MissingRolesException {
    return new MissingRolesException(
      `User does not have the necessary role(s) '${requiredRoles}'!`,
    );
  }
}

