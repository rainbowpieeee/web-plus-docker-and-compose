import { IsOptional, Length, IsUrl, IsArray } from 'class-validator';
import {
  WISHLIST_NAME_LENGTH_MIN,
  WISHLIST_NAME_LENGTH_MAX,
  WISHLIST_DESCRIPTION_LENGTH_MIN,
  WISHLIST_DESCRIPTION_LENGTH_MAX,
} from '../../constants';

export class UpdateWischlistDto {
  @IsOptional()
  @Length(WISHLIST_NAME_LENGTH_MIN, WISHLIST_NAME_LENGTH_MAX, {
    message: 'Название коллекции может содержать не более 250 символов.',
  })
  name: string;

  @IsOptional()
  @Length(WISHLIST_DESCRIPTION_LENGTH_MIN, WISHLIST_DESCRIPTION_LENGTH_MAX, {
    message: 'Описание коллекции может содержать до 1500 символов',
  })
  description: string;

  @IsOptional()
  @IsUrl({
    message: 'Укажите валидный URL-адрес изображения',
  })
  image: string;

  @IsOptional()
  @IsArray()
  itemsId: number[];
}
