import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Length, IsNotEmpty, IsUrl } from 'class-validator';
import { Wish } from '../../wisches/entities/wisch.entity';
import { User } from '../../users/entities/user.entity';
import {
  WISHLIST_NAME_LENGTH_MIN,
  WISHLIST_NAME_LENGTH_MAX,
  WISHLIST_DESCRIPTION_LENGTH_MIN,
  WISHLIST_DESCRIPTION_LENGTH_MAX,
} from '../../constants';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: WISHLIST_NAME_LENGTH_MAX, nullable: false })
  @Length(WISHLIST_NAME_LENGTH_MIN, WISHLIST_NAME_LENGTH_MAX)
  @IsNotEmpty()
  name: string;

  @Column('varchar', {
    length: WISHLIST_DESCRIPTION_LENGTH_MAX,
    nullable: true,
  })
  @Length(WISHLIST_DESCRIPTION_LENGTH_MIN, WISHLIST_DESCRIPTION_LENGTH_MAX)
  description: string;

  @Column({ nullable: false })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
