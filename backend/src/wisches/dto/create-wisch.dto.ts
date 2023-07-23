import { IsNotEmpty, Length, IsUrl } from 'class-validator';
import {
  WISH_NAME_LENGTH_MIN,
  WISH_NAME_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MIN,
} from '../../constants';

export class CreateWischDto {
  @IsNotEmpty({ message: 'Необходимо указать название подарка' })
  @Length(WISH_NAME_LENGTH_MIN, WISH_NAME_LENGTH_MAX, {
    message: 'Название подарка должно содержать от 1 до 250 символов',
  })
  name: string;

  @IsNotEmpty({
    message: 'Необходимо указать URL-адрес подарка на сайте магазина',
  })
  @IsUrl({ message: 'Укажите валидный URL-адрес подарка' })
  link: string;

  @IsNotEmpty({ message: 'Необходимо указать URL-адрес картинки подарка' })
  @IsUrl({ message: 'Укажите валидный URL-адрес картинки подарка' })
  image: string;

  @IsNotEmpty({ message: 'Необходимо указать цену подарка' })
  price: number;

  @IsNotEmpty({ message: 'Необходимо дать описание подарка' })
  @Length(WISH_DESCRIPTION_LENGTH_MIN, WISH_DESCRIPTION_LENGTH_MAX, {
    message: 'Описание подарка должно содержать от 1 до 1024 символов',
  })
  description: string;
}
