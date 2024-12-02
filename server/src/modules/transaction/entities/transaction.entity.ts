import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable : false})
  name: string;

  @Column({nullable : false})
  amount: string;

  @Column({nullable : true})
  description: string;

  @Column({nullable : true})
  category: string;

  @Column({ type: 'date', nullable: false })
  date: string; 

  @Column({nullable : false})
  userId: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
