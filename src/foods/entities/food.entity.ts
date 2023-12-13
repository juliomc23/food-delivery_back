import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  food_name: string;

  @Column('text')
  restaurant: string;

  @Column('numeric', {
    default: 0,
  })
  price: string;
}
