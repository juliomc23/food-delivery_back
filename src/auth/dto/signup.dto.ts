import {
  IsEmail,
  IsISO8601,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(3)
  lastname: string;
  @IsISO8601()
  birthdate: string;
  @IsPhoneNumber()
  phoneNumber: number;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
