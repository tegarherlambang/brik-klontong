import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}