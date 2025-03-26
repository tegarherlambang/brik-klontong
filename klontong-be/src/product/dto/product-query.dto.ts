// src/product/dto/product-query.dto.ts
import { IsNumber, IsOptional, IsString, Min, Max } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';

export class ProductQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}