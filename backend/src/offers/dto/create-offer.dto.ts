import { IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsNotEmpty({
    message: 'Необходимо указать, сколько Вы готовы внести для оплаты подарка',
  })
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;
}
