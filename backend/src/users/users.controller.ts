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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindManyDto } from './dto/find-many.dto';
import { Request as RequestExpress } from 'express';
import { UserHelper } from './helpers/user.helper';
import {
  InvalidData,
  UserOrMailExistsExceptionFilter,
} from '../filters/user-exists.filter';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userHelper: UserHelper,
  ) {}

  @UseFilters(UserOrMailExistsExceptionFilter)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  async findMe(@Request() request: RequestExpress) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    const { password, ...userWithoutPassword } =
      await this.usersService.findOne({
        id: userId,
      });
    return userWithoutPassword;
  }

  @UseFilters(InvalidData, UserOrMailExistsExceptionFilter)
  @Patch('me')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: RequestExpress,
  ) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    return this.usersService.updateMe(userId, updateUserDto);
  }

  @Get('me/wishes')
  async findMyWishes(@Request() request: RequestExpress) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    const { wishes } = await this.usersService.findMyWishes(userId);
    return wishes;
  }

  @Get(':username/wishes')
  async findAnotherUserWishes(@Param('username') username: string) {
    const { wishes } = await this.usersService.findAnotherUserWishes(username);
    return wishes;
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const { email, password, ...userData } = await this.usersService.findOne({
      username,
    });
    return userData;
  }

  @Post('find')
  findMany(@Body() findManyDto: FindManyDto) {
    return this.usersService.findMany(findManyDto.query);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove({ username });
  }
}
