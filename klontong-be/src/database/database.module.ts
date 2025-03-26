import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/entities/product.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().default('root'),
        DB_NAME: Joi.string().default('klontong'),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Product, ProductCategory],
        synchronize: configService.get<boolean>('DB_SYNC'),
        logging: true,
        poolSize: 10,
        extra: {
          connectionLimit: 10,
        },
      }),
    }),
    TypeOrmModule.forFeature([User, Product, ProductCategory]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}