import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { NumberInParamOfferDto } from './dto/number-in-param-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Body() createOfferDto: CreateOfferDto,
    @Request() request: RequestExpress,
  ) {
    return this.offersService.createOffer(createOfferDto, request);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: NumberInParamOfferDto) {
    return this.offersService.findOne({ id: params.id });
  }

  @Patch(':id')
  update(
    @Param('id') params: NumberInParamOfferDto,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update({ id: params.id }, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param() params: NumberInParamOfferDto) {
    return this.offersService.remove({ id: params.id });
  }
}
