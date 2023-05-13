import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guards/jwtGuard';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() offer: CreateOfferDto, @Req() req) {
    return this.offersService.create(offer, req.user);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
