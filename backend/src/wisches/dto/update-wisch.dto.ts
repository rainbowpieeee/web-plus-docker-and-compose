import { IsNotEmpty, Length, IsUrl, IsOptional } from 'class-validator';
import {
  WISH_NAME_LENGTH_MIN,
  WISH_NAME_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MIN,
} from '../../constants';

export class UpdateWischDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Поле с названием подарка не может быть пустым' })
  @Length(WISH_NAME_LENGTH_MIN, WISH_NAME_LENGTH_MAX, {
    message: 'Название подарка должно содержать от 1 до 250 символов',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Ссылка на страницу с подарком не может отсутствовать',
  })
  @IsUrl({ message: 'Укажите валидный URL-адрес подарка' })
  link: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Ссылка на картинку с подарком не может отсутствовать',
  })
  @IsUrl({ message: 'Укажите валидный URL-адрес картинки подарка' })
  image: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Поле с названием подарка не может быть пустым' })
  price: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Поле с описанием подарка не может быть пустым' })
  @Length(WISH_DESCRIPTION_LENGTH_MIN, WISH_DESCRIPTION_LENGTH_MAX, {
    message: 'Описание подарка должно содержать от 1 до 1024 символов',
  })
  description: string;
}
