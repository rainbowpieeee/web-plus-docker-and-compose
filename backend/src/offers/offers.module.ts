import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';
import { WischesModule } from '../wisches/wisches.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WischesModule, UsersModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
