import { IsNumberString } from 'class-validator';

export class IdInParamsWishList {
  @IsNumberString()
  id: number;
}
