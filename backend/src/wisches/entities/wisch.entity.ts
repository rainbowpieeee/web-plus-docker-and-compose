import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import {
  WISH_NAME_LENGTH_MIN,
  WISH_NAME_LENGTH_MAX,
  MONEY_NUMBER_PRECISION,
  MONEY_NUMBER_SCALE,
  WISH_DESCRIPTION_LENGTH_MAX,
  WISH_DESCRIPTION_LENGTH_MIN,
} from '../../constants';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: WISH_NAME_LENGTH_MAX, nullable: false })
  @Length(WISH_NAME_LENGTH_MIN, WISH_NAME_LENGTH_MAX)
  @IsNotEmpty()
  name: string;

  @Column({ nullable: false })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @Column({ nullable: false })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @Column({
    type: 'numeric',
    precision: MONEY_NUMBER_PRECISION,
    scale: MONEY_NUMBER_SCALE,
    nullable: false,
  })
  @IsNotEmpty()
  price: number;

  @Column({
    type: 'numeric',
    precision: MONEY_NUMBER_PRECISION,
    scale: MONEY_NUMBER_SCALE,
    default: 0,
  })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column('varchar', { length: WISH_DESCRIPTION_LENGTH_MAX })
  @Length(WISH_DESCRIPTION_LENGTH_MIN, WISH_DESCRIPTION_LENGTH_MAX)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column('integer', { default: 0 })
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('integer', { nullable: true })
  copied_from: number;
}
