import { IsNotEmpty, Length, MinLength } from 'class-validator';
import {
  USERNAME_LENGTH_MIN,
  USERNAME_LENGTH_MAX,
  PASSWORD_LENGTH_MIN,
} from '../../constants';

export class AuthUserDto {
  @IsNotEmpty({ message: 'Поле Юзерннейм обязательно' })
  @Length(USERNAME_LENGTH_MIN, USERNAME_LENGTH_MAX, {
    message: 'Имя пользователя должно быть не менее 3 и не более 64 символов',
  })
  username: string;

  @IsNotEmpty({ message: 'Поле Пароль обязательно' })
  @MinLength(PASSWORD_LENGTH_MIN, {
    message: 'Пароль должен быть не менее 3 символов',
  })
  password: string;
}
