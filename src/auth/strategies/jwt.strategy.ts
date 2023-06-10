import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUser } from '../../users/entities/auth-user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const firstlineDomain = process.env.FIRSTLINE_DOMAIN;
    const issuerUrl = ['localhost', '127.0.0.1'].some((localDomain) =>
      firstlineDomain.includes(localDomain),
    )
      ? `http://${firstlineDomain}`
      : `https://${firstlineDomain}`;
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: false,
        rateLimit: false,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerUrl}/api/v3/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.FIRSTLINE_AUDIENCE,
      issuer: `${issuerUrl}/`,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(request, payload: any): Promise<AuthUser> {
    if (!payload)
      throw new InternalServerErrorException(
        null,
        'An error occurred while parsing the JWT (undefined)',
      );

    try {
      const accessToken = request.headers['authorization'].split(' ')[1];

      // fetch user from database here
      // const user = await this.usersService.findByAuthId(authId);
      const authUser: AuthUser = {
        accessToken: accessToken,
        sub: payload.sub, // = Firstline UserId
        email: payload.email,
        username: payload.username,
        roles: payload.roles,
        permissions: payload.permissions,
        // user,
      };
      return authUser;
    } catch (e) {
      Logger.error(e);

      // if (e instanceof UserNotFoundException) throw MissingUserException.for();
      // else
      throw new InternalServerErrorException(
        null,
        'An error occurred while parsing the JWT.',
      );
    }
  }
}

