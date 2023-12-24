import { PartialType } from '@nestjs/mapped-types';
import { OrderEntity } from '../entities/order.entity';

export class CreateOrderDto extends PartialType(OrderEntity) {
  userId: number;
  pizzaIds: number;
  deliveryAddress: string;
}
