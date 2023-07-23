import { IsNumberString } from 'class-validator';

export class IdWishInParamsDto {
  @IsNumberString()
  public id: number;
}
