import { Food } from 'src/foods/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Food, (food) => food.restaurant, { cascade: true })
  foods: Food[];

  @Column()
  home_delivery: boolean;
}
