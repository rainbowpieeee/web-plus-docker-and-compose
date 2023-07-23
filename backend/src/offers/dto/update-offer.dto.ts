import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  hidden: boolean;
}
