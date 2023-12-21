import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text' })
  lastname: string;
  @Column({ type: 'text', unique: true })
  email: string;
  @Column({ type: 'text' })
  password: string;
  @Column({ type: 'numeric' })
  phoneNumber: number;
  @Column({ type: 'text' })
  birthdate: string;
  @Column({ type: 'boolean' })
  isActive: boolean;
  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[];
}
