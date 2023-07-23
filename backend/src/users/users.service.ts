import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserHash } from './helpers/hash.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userHasch: UserHash,
  ) {}

  private readonly userInfoWithoutPasswordEmail = {
    select: {
      id: true,
      username: true,
      about: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  };

  private readonly userInfoWithoutPassword = {
    select: {
      ...this.userInfoWithoutPasswordEmail.select,
      email: true,
    },
  };
  // добавлен фильтр исключений в контроллере по роуту  post 'users'
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.userHasch.hashPassword(
      createUserDto.password,
    );
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(
    query: { [name: string]: number | string },
    userInfo = undefined,
  ) {
    return await this.userRepository.findOneOrFail({
      ...userInfo,
      where: query,
    });
  }
  // добавлен фильтр исключений в контроллере по роуту  patch 'users/me'
  async update(
    query: { [name: string]: string | number },
    updateOfferDto: UpdateUserDto,
  ) {
    return await this.userRepository.update(query, updateOfferDto);
  }

  remove(query: { [name: string]: string | number }) {
    return this.userRepository.delete(query);
  }

  async findMany(query: string) {
    return await this.userRepository.find({
      ...this.userInfoWithoutPasswordEmail,
      where: [{ username: query }, { email: query }],
    });
  }

  async updateMe(userId: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.userHasch.hashPassword(
        updateUserDto.password,
      );
    }
    await this.update({ id: userId }, updateUserDto);
    return await this.findOne({ id: userId }, this.userInfoWithoutPassword);
  }

  async findMyWishes(userId: number) {
    return await this.findOne(
      { id: userId },
      {
        select: {
          wishes: true, // выбрано не все, что нужно по свагеру, но в коде не увидел, куда нужна вся эта информация
        },
        relations: {
          wishes: true,
        },
      },
    );
  }

  async findAnotherUserWishes(username: string) {
    return await this.findOne(
      { username },
      {
        select: {
          wishes: true, // выбрано не все, так как по коду нужна только информация о самом подарке
        },
        relations: {
          wishes: true,
        },
      },
    );
  }
}
