import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product, ProductCategory]),
    MulterModule.register({
      dest: './uploads/products',
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}