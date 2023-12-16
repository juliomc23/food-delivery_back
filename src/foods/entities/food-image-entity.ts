import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Food } from './food.entity';

@Entity()
export class FoodImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    nullable: true,
  })
  url: string;

  @OneToOne(() => Food, (food) => food.food_image)
  @JoinColumn()
  food: Food;
}
