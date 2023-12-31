import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  find(@Param('id') id: string): Promise<Order> {
    return this.ordersService.find(+id);
  }

  @Get('')
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
