import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestExpress } from 'express';
import { Wishlist } from './entities/wischlist.entity';
import { CreateWischlistDto } from './dto/create-wischlist.dto';
import { UpdateWischlistDto } from './dto/update-wischlist.dto';
import { UserHelper } from '../users/helpers/user.helper';
import { UsersService } from '../users/users.service';
import { WischesService } from '../wisches/wisches.service';
import { WishlistsError } from '../errors/errors';
import { HTTP_CODE_FORBIDDEN } from '../constants';

const optionWischlistInfo = {
  select: {
    owner: {
      id: true,
      username: true,
      about: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  relations: {
    items: true,
    owner: true,
  },
};

@Injectable()
export class WischlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
    private userHelper: UserHelper,
    private usersService: UsersService,
    private wischesService: WischesService,
  ) {}

  async create(data: { [name: string]: string | object }) {
    return await this.wishListRepository.save(data);
  }

  async findAll(options: any) {
    return await this.wishListRepository.find(options);
  }

  async findOne(options: any) {
    return await this.wishListRepository.findOneOrFail(options);
  }

  async update(id: number, data: { [name: string]: string | object[] }) {
    return await this.wishListRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.wishListRepository.delete(id);
  }

  async removeWishlist(query: any, request: RequestExpress) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    const wishlist = await this.findOne({
      ...optionWischlistInfo,
      where: query,
    });
    if (wishlist.owner.id !== userId) {
      throw new WishlistsError(
        'Удалить список желаний может только его владелец. Вы паетесь удалить чужой список.',
        HTTP_CODE_FORBIDDEN,
      );
    }
    const wishlistInfo = { ...wishlist };
    if (wishlist.items.length > 0) {
      wishlist.items = [];
      await this.wishListRepository.save(wishlist);
    }
    await this.remove(wishlist.id);
    return wishlistInfo;
  }

  async createWishlist(
    createWischlistDto: CreateWischlistDto,
    request: RequestExpress,
  ) {
    const ownerId = this.userHelper.getUserIdOutRequest(request);
    const owner = await this.usersService.findOne({ id: ownerId });
    const { itemsId, ...restCreateWischlistDto } = createWischlistDto;
    const itemsList = itemsId.map((itemId) => {
      return this.wischesService.findOne({ where: { id: itemId } });
    });
    return await Promise.all(itemsList)
      .then((items) => {
        const wishlistData = {
          ...restCreateWischlistDto,
          owner,
          items,
        };
        return this.create(wishlistData);
      })
      .then((wishlist) => {
        return wishlist;
      });
  }

  async findAllWishlists() {
    return await this.findAll(optionWischlistInfo);
  }

  async findeOnWishlist(id: number) {
    return await this.findOne({
      ...optionWischlistInfo,
      where: {
        id,
      },
    });
  }

  async updateWishlist(
    id: number,
    updateWischlistDto: UpdateWischlistDto,
    request: RequestExpress,
  ) {
    const userId = this.userHelper.getUserIdOutRequest(request);
    const wischlist = await this.findOne({
      relations: { items: true, owner: true },
      where: { id },
    });
    if (wischlist.owner.id !== userId) {
      throw new WishlistsError(
        'Редактировать список желаний может только его владелец. Вы паетесь редактировать чужой список.',
        HTTP_CODE_FORBIDDEN,
      );
    }
    const { itemsId, ...data } = updateWischlistDto;
    if (!itemsId) {
      await this.update(id, data);
      return await this.findOne({
        ...optionWischlistInfo,
        where: { id },
      });
    } else {
      wischlist.items = wischlist.items.filter((item) => {
        return itemsId.includes(item.id);
      });
      return this.wishListRepository.save({
        ...wischlist,
        ...data,
      });
    }
  }
}
