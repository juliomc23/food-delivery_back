import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @MinLength(4)
  food_name: string;

  @IsString()
  @IsOptional()
  food_description?: string;

  @IsString()
  @IsOptional()
  food_image?: string;

  @IsString()
  @MinLength(4)
  restaurant: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
