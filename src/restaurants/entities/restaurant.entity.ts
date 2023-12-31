import { User } from 'src/auth/entities/auth.entity';
import { Food } from 'src/foods/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Food, (food) => food.restaurant, { cascade: true })
  foods: Food[];

  @Column()
  home_delivery: boolean;

  @ManyToOne(() => User, (user) => user.restaurants)
  user: User;
}
