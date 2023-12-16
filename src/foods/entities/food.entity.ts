import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodImage } from './food-image-entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  food_name: string;

  @Column('text', {
    nullable: true,
  })
  food_description: string;

  @OneToOne(() => FoodImage, (foodImage) => foodImage.food, { cascade: true })
  food_image?: FoodImage;

  @Column('text')
  restaurant: string;

  @Column('numeric', {
    default: 0,
  })
  price: number;
}
