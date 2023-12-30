import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAddressDto } from './dto/update-user.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.usersService.find(+id);
  }

  @Patch(':id/update-address')
  updateAddress(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.usersService.updateAddress(+id, updateUserAddressDto);
  }
  @Get(':id/orders')
  findAllOrders(@Param('id') id: string) {
    return this.usersService.findAllOrders(+id);
  }

  @Post(':id/orders')
  makeOrder(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.usersService.makeOrder(+id, createOrderDto);
  }

  @Patch(':id/orders/:orderId/cancel')
  cancelOrder(@Param('id') id: string, @Param('orderId') orderId: string) {
    return this.usersService.cancelOrder(+orderId, +id);
  }

  @Patch(':id/orders/:orderId/complete')
  completeOrder(@Param('id') id: string, @Param('orderId') orderId: string) {
    return this.usersService.completeOrder(+orderId, +id);
  }
  @Get(':id/pizza/recommended')
  getRecommendedPizza(@Param('id') id: string) {
    return this.usersService.getRecommendedPizza(+id);
  }

}
