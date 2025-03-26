import { IsString, IsNotEmpty, MaxLength } from '@nestjs/class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  categoryName: string;
}