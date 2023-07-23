import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length, IsNotEmpty, IsUrl, IsEmail } from 'class-validator';
import { Wish } from '../../wisches/entities/wisch.entity';
import { Wishlist } from '../../wischlists/entities/wischlist.entity';
import { Offer } from '../../offers/entities/offer.entity';
import {
  USERNAME_LENGTH_MIN,
  USERNAME_LENGTH_MAX,
  ABOUT_LENGTH_MIN,
  ABOUT_LENGTH_MAX,
} from '../../constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: USERNAME_LENGTH_MAX,
    unique: true,
    nullable: true,
  })
  @Length(USERNAME_LENGTH_MIN, USERNAME_LENGTH_MAX)
  @IsNotEmpty()
  username: string;

  @Column('varchar', {
    length: ABOUT_LENGTH_MAX,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(ABOUT_LENGTH_MIN, ABOUT_LENGTH_MAX)
  about: string;

  @Column('varchar', { default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column('varchar', { unique: true, nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column('varchar', { nullable: true })
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
