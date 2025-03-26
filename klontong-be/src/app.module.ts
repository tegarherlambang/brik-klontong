import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { SeederModule } from './seeder/seeder.module';
import { SeedCommand } from './commands/seed.command';
import { ConsoleModule } from 'nestjs-console';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ProductModule,
    AuthModule,
    ProductCategoryModule,
    ConsoleModule,
    SeederModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
      envFilePath: `.env`,
    }),
  ],
  providers: [SeedCommand],
})
export class AppModule {}