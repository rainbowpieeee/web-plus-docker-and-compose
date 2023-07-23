import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserHelper } from './helpers/user.helper';
import { UserHash } from './helpers/hash.helper';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, UserHelper, UserHash],
  exports: [UsersService, UserHash, UserHelper],
})
export class UsersModule {}
