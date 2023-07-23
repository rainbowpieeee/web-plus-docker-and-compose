import { IsString, IsNotEmpty } from 'class-validator';

export class FindManyDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}
