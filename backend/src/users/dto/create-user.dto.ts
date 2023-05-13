import { IsEmail, IsString, Length, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @Length(2, 200)
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
