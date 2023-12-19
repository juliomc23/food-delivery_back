import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString({ each: true })
  @IsArray()
  foods: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  home_delivery: boolean;
}
