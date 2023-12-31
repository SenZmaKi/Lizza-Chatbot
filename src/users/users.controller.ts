import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAddressDto } from './dto/update-user.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { User } from './entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Pizza } from 'src/pizzas/entities/pizza.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<User> {
    return this.usersService.find(+id);
  }

  @Patch(':id/update-address')
  updateAddress(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<User> {
    return this.usersService.updateAddress(+id, updateUserAddressDto);
  }
  @Get(':id/orders')
  findAllOrders(@Param('id') id: string): Promise<Order[]> {
    return this.usersService.findAllOrders(+id);
  }

  @Post(':id/orders')
  makeOrder(
    @Param('id') id: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.usersService.makeOrder(+id, createOrderDto);
  }

  @Patch(':id/orders/:orderId/cancel')
  cancelOrder(
    @Param('id') id: string,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return this.usersService.cancelOrder(+orderId, +id);
  }

  @Patch(':id/orders/:orderId/complete')
  completeOrder(
    @Param('id') id: string,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return this.usersService.completeOrder(+orderId, +id);
  }
  @Get(':id/pizza/recommended')
  getRecommendedPizza(@Param('id') id: string): Promise<Pizza> {
    return this.usersService.getRecommendedPizza(+id);
  }
}
