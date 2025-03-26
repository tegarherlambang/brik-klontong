import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // This makes UserRepository available
  providers: [UserService],
  exports: [UserService], // Export if other modules need to use UserService
})
export class UserModule {}