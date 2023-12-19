import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Food } from './food.entity';

@Entity({ name: 'food_image' })
export class FoodImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @OneToOne(() => Food, (food) => food.food_image, { onDelete: 'CASCADE' })
  @JoinColumn()
  food: Food;
}
