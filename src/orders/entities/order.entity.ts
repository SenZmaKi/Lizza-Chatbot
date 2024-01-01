// order.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

@Entity()
export class Order extends AbstractEntity {
  @ApiProperty({ type: User, description: 'The user who placed the order' })
  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    nullable: false,
    cascade: true,
  })
  user: User;

  @ApiProperty({
    type: Pizza,
    isArray: true,
    description: 'The list of ordered pizzas',
  })
  @ManyToMany(() => Pizza, (pizza) => pizza.orders, {
    eager: true,
    nullable: false,
  })
  @JoinTable()
  pizzas: Pizza[];

  @ApiProperty({
    example: 'Pending',
    description:
      'The status of the order. Can either be Pending, Completed, or Cancelled',
  })
  @Column({
    type: 'simple-enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: string;

  static create(user: User, pizzas: Pizza[]): Order {
    const order = new Order();
    order.user = user;
    order.pizzas = pizzas;
    return order;
  }
}
