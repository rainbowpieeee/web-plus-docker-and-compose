import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wisches/entities/wisch.entity';
import { MONEY_NUMBER_PRECISION, MONEY_NUMBER_SCALE } from '../../constants';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column('numeric', {
    precision: MONEY_NUMBER_PRECISION,
    scale: MONEY_NUMBER_SCALE,
    nullable: false,
  })
  @IsNotEmpty()
  amount: number;

  @Column('boolean', { default: false })
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
