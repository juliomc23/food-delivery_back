import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Food } from 'src/foods/entities';

export class CreateRestaurantDto {
  @IsString()
  @MinLength(4)
  name: string;

  // @IsString({ each: true })
  @IsArray()
  foods: Food[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  home_delivery: boolean;
}
