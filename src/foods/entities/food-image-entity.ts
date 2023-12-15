import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FoodImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    nullable: true,
  })
  url: string;
}
