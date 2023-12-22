import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import Point from 'geojson';

enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pizzaIds: number[];

  @Column()
  customerId: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  orderStatus: OrderStatus;

  @Column()
  deliveryAddress: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
  }) // TODO: Create a DFS Backtracking algorithm for finding the shortest path to the customer
  deliveryPersonCurrentLocation: Point.Point;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
