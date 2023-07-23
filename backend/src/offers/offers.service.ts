import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestExpress } from 'express';
import { Offer } from './entities/offer.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { WischesService } from '../wisches/wisches.service';
import { UserHelper } from '../users/helpers/user.helper';
import { UsersService } from '../users/users.service';
import { OfferError } from '../errors/errors';
import { HTTP_CODE_CONFLICT } from '../constants';
import { Wish } from 'src/wisches/entities/wisch.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    public readonly wischesService: WischesService,
    private readonly userHelper: UserHelper,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  private readonly offerInfo = {
    select: {
      user: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    relations: {
      item: true,
      user: true,
    },
  };

  async create(offer: { [name: string]: string | object | number | boolean }) {
    return await this.offerRepository.save(offer);
  }

  async findAll(offerInfo = this.offerInfo) {
    return await this.offerRepository.find(offerInfo);
  }

  async findOne(
    query: { [name: string]: number | string },
    offerInfo = this.offerInfo,
  ) {
    return await this.offerRepository.findOneOrFail({
      ...offerInfo,
      where: query,
    });
  }

  async update(
    query: { [name: string]: string | number },
    updateOfferDto: UpdateOfferDto,
  ) {
    return await this.offerRepository.update(query, updateOfferDto);
  }

  async remove(query: { [name: string]: string | number }) {
    return await this.offerRepository.delete(query);
  }

  async createOffer(createOfferDto: CreateOfferDto, request: RequestExpress) {
    const item = await this.wischesService.findOne({
      select: { owner: { id: true } },
      relations: { owner: true },
      where: { id: createOfferDto.itemId },
    });
    const userId = this.userHelper.getUserIdOutRequest(request);
    if (userId === item.owner.id) {
      throw new OfferError(
        'Вы подаете заявку на оплату собственного подарка. Это могут делать только другие пользователи.',
        HTTP_CODE_CONFLICT,
      );
    }
    if (item.price === item.raised) {
      throw new OfferError(
        'Средства на данный подарок уже собраны. К сожалению, Вы не можете подать новую заявку.',
        HTTP_CODE_CONFLICT,
      );
    }
    const amountCollected = Number(item.raised) + createOfferDto.amount;
    if (item.price < amountCollected) {
      throw new OfferError(
        `Общая сумма сбора с Вашим взносом превышает цену подарка. Выберите сумму, не превышающую ${
          Math.round((item.price - item.raised) * 100) / 100
        } рублей`,
        HTTP_CODE_CONFLICT,
      );
    }

    const user = await this.usersService.findOne({ id: userId });
    const offer = {
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
      item,
      user,
    };
    // создание offer с помощью транзакции
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(Offer, offer);
      await queryRunner.manager.update(
        Wish,
        { id: item.id },
        { raised: amountCollected },
      );
      await queryRunner.commitTransaction();
      return {};
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
