import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable : false})
  name: string;

  @Column({nullable : false, unique : true})
  email: string;

  @Column({nullable : false})
  password: string;
}
