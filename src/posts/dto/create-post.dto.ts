import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@Exclude()
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(600)
  @Expose()
  text: string;
}

