import { BaseEntity } from 'src/general/baseEntity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Offer extends BaseEntity {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: User;

  @Column({
    type: 'numeric',
    scale: 2,
  })
  amount: number;

  @Column({
    type: 'boolean',
    default: 'false',
  })
  hidden: boolean;
}
