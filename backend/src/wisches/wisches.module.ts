import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WischesService } from './wisches.service';
import { WischesController } from './wisches.controller';
import { Wish } from './entities/wisch.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wish]), UsersModule],
  controllers: [WischesController],
  providers: [WischesService],
  exports: [WischesService],
})
export class WischesModule {}
