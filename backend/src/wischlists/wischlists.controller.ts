import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { WischlistsService } from './wischlists.service';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';
import { IdInParamsWishList } from './dto/id-in-params-wishlist.dto';
import { RestrictionUserInfoWishlistInterceptor } from './interceptors/restriction-user-info-wishlist.interceptor';

@Controller('wishlistlists')
export class WischlistsController {
  constructor(private readonly wischlistsService: WischlistsService) {}

  @UseInterceptors(RestrictionUserInfoWishlistInterceptor)
  @Post()
  async create(
    @Body() createWischlistDto: CreateWischlistDto,
    @Request() request: RequestExpress,
  ) {
    return await this.wischlistsService.createWishlist(
      createWischlistDto,
      request,
    );
  }

  @Get()
  findAll() {
    return this.wischlistsService.findAllWishlists();
  }

  @Get(':id')
  findOne(@Param() params: IdInParamsWishList) {
    return this.wischlistsService.findeOnWishlist(params.id);
  }

  @UseInterceptors(RestrictionUserInfoWishlistInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() request: RequestExpress,
    @Body() updateWischlistDto: UpdateWischlistDto,
  ) {
    return this.wischlistsService.updateWishlist(
      +id,
      updateWischlistDto,
      request,
    );
  }

  @UseInterceptors(RestrictionUserInfoWishlistInterceptor)
  @Delete(':id')
  remove(
    @Param() params: IdInParamsWishList,
    @Request() request: RequestExpress,
  ) {
    return this.wischlistsService.removeWishlist({ id: params.id }, request);
  }
}
