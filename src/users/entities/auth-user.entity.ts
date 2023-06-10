import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Permission } from '../../permissions/enums/permission.enum';
import { Role } from '../../roles/enums/role.enum';

@Exclude()
export class AuthUser {
  @IsString()
  @IsNotEmpty()
  @Expose()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  sub: string; // = Firstline UserId

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  username: string;

  @IsDefined()
  @IsArray()
  @IsEnum(Role, { each: true })
  @Expose()
  roles: Role[] = [];

  @IsDefined()
  @IsArray()
  @IsEnum(Permission, { each: true })
  @Expose()
  permissions: Permission[] = [];

  /* Could additionally store and retrieve use from DB
  @Type(() => User)
  @Expose()
  user: User;*/
}

