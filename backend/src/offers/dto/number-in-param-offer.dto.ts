import { IsNumberString } from 'class-validator';

export class NumberInParamOfferDto {
  @IsNumberString()
  id: number;
}
