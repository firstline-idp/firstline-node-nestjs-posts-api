import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthUser } from '../../users/entities/auth-user.entity';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    let user = ctx.switchToHttp().getRequest()?.user;

    if (!user)
      throw new InternalServerErrorException(null, 'User is undefined!');

    return user;
  },
);

