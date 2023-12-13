import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @MinLength(4)
  food_name: string;
  @IsString()
  @MinLength(4)
  restaurant: string;
  @IsNumber()
  @IsPositive()
  price: number;
}
