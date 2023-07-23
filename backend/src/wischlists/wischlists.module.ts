import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WischlistsService } from './wischlists.service';
import { WischlistsController } from './wischlists.controller';
import { Wishlist } from './entities/wischlist.entity';
import { UsersModule } from '../users/users.module';
import { WischesModule } from '../wisches/wisches.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), UsersModule, WischesModule],
  controllers: [WischlistsController],
  providers: [WischlistsService],
})
export class WischlistsModule {}
