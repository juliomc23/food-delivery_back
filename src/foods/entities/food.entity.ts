import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FoodImage } from './food-image-entity';

@Entity({ name: 'foods' })
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  food_name: string;

  @Column('text', {
    nullable: true,
  })
  food_description: string;

  @OneToOne(() => FoodImage, (foodImage) => foodImage.food, {
    cascade: true,
    eager: true,
  })
  food_image?: FoodImage;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  restaurant: Restaurant;

  @Column('numeric', {
    default: 0,
  })
  price: number;
}
