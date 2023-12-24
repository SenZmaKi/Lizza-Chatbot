import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { Entity, Column } from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

@Entity()
export class OrderEntity extends AbstractEntity {
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
