import {
  Length,
  IsNotEmpty,
  IsUrl,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';
import {
  USERNAME_LENGTH_MIN,
  USERNAME_LENGTH_MAX,
  ABOUT_LENGTH_MIN,
  ABOUT_LENGTH_MAX,
  PASSWORD_LENGTH_MIN,
} from '../../constants';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Поле Юзерннейм обязательно' })
  @Length(USERNAME_LENGTH_MIN, USERNAME_LENGTH_MAX, {
    message: 'Имя пользователя должно быть не менее 3 и не более 64 символов',
  })
  username: string;

  @IsOptional()
  @Length(ABOUT_LENGTH_MIN, ABOUT_LENGTH_MAX, {
    message:
      'Информация о пользователе должна быть не менее 2 и не более 200 символов или поле должно быть пустым',
  })
  about: string;

  @IsOptional()
  @IsUrl({
    message:
      'В поле Аватар следует указать URL изображения или оставить пустым',
  })
  avatar: string;

  @IsNotEmpty({ message: 'Поле E-mail обязательно' })
  @IsEmail({
    message: 'В поле E-mail был указан невалидный адрес электронной почты',
  })
  email: string;

  @IsNotEmpty({ message: 'Поле Пароль обязательно' })
  @MinLength(PASSWORD_LENGTH_MIN, {
    message: 'Пароль должен быть не менее 3 символов',
  })
  password: string;
}
