import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsOptional,IsUrl } from '@nestjs/class-validator';

export class CreateProductDto {
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
  @IsUrl({ require_tld: false }) // Allows localhost URLs
  image?: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;
}