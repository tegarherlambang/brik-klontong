// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { User } from '../user/user.entity';
import { Product } from '../product/entities/product.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, ProductCategory]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}