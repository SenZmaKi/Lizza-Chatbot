import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ array: true })
  pizzaIds: number;

  @Column()
  userId: number;

  @Column({
    type: 'simple-enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  orderStatus: string;

  @Column()
  deliveryAddress: string;
}
