import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { WischesService } from './wisches.service';
import { CreateWischDto } from './dto/create-wisch.dto';
import { UpdateWischDto } from './dto/update-wisch.dto';
import { IdWishInParamsDto } from './dto/id-wish.dto';
import { UserHelper } from '../users/helpers/user.helper';
import { Request as RequestExpress } from 'express';
import { InvalidData } from '../filters/user-exists.filter';
import {
  UpdateWishErrorFilter,
  EntityNotFoundErrorFilter,
} from '../filters/wish-exicts.filter';
import { FindOneResponseInterceptor } from './interceptors/find-one-response.interceptors';

@Controller('wishes')
export class WischesController {
  constructor(
    private readonly wischesService: WischesService,
    private readonly userHelper: UserHelper,
  ) {}

  @UseFilters(InvalidData)
  @Post()
  create(
    @Body() createWischDto: CreateWischDto,
    @Request() request: RequestExpress,
  ) {
    const ownerId = this.userHelper.getUserIdOutRequest(request);
    return this.wischesService.createWish(createWischDto, ownerId);
  }

  @Get('last')
  findAllLast() {
    return this.wischesService.findAllLast();
  }

  @Get('top')
  findAllTop() {
    return this.wischesService.findAllTop();
  }

  @UseInterceptors(FindOneResponseInterceptor)
  @Get(':id')
  findOne(@Param() params: IdWishInParamsDto) {
    return this.wischesService.findOneWish({ id: params.id });
  }

  @UseFilters(UpdateWishErrorFilter)
  @Patch(':id')
  update(
    @Param() params: IdWishInParamsDto,
    @Body() updateWischDto: UpdateWischDto,
    @Request() request: RequestExpress,
  ) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    return this.wischesService.updatingByOwner(
      params.id,
      updateWischDto,
      userId,
    );
  }

  @UseFilters(EntityNotFoundErrorFilter)
  @Delete(':id')
  remove(
    @Param() params: IdWishInParamsDto,
    @Request() request: RequestExpress,
  ) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    return this.wischesService.removeWish(params.id, userId);
  }

  @Post(':id/copy')
  async copy(
    @Param() param: IdWishInParamsDto,
    @Request() request: RequestExpress,
  ) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    return await this.wischesService.copy({ id: +param.id }, userId);
  }
}
