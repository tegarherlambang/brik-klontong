import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsOptional } from '@nestjs/class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsNotEmpty()
  weight: number;

  @IsDecimal()
  @IsNotEmpty()
  width: number;

  @IsDecimal()
  @IsNotEmpty()
  length: number;

  @IsDecimal()
  @IsNotEmpty()
  height: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;
}