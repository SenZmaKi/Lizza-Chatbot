import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * @description Responsible for handling all requests to the /orders endpoint
 */
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiTags('orders')
  @ApiOperation({ summary: 'Get an order' })
  @ApiParam({ name: 'id', description: 'Order ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Order found successfully',
    type: Order,
  })
  @Get(':id')
  find(@Param('id') id: string): Promise<Order> {
    return this.ordersService.find(+id);
  }

  @ApiTags('orders')
  @ApiOperation({ summary: 'Get a list of all orders' })
  @ApiResponse({
    status: 200,
    description: 'List of orders found successfully',
    type: [Order],
  })
  @Get('')
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
