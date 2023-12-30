import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  find(@Param('id') id: string) {
    return this.ordersService.find(+id);
  }

  @Get('')
  findAll() {
    return this.ordersService.findAll();
  }

}
