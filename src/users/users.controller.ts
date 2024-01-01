// users.controller.ts
import { ApiTags, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAddressDto } from './dto/update-user.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { User } from './entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Pizza } from 'src/pizzas/entities/pizza.entity';

/**
 * @description Responsible for handling all requests to the /users endpoint
**/
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get a list of all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: User, isArray: true })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: 200, description: 'User found successfully', type: User })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  find(@Param('id') id: string): Promise<User> {
    return this.usersService.find(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the address of a user' })
  @ApiResponse({ status: 200, description: 'User address updated successfully', type: User })
  @ApiParam({ name: 'id', description: 'User ID' , example: 1})
  @ApiBody({ type: UpdateUserAddressDto })
  updateAddress(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<User> {
    return this.usersService.updateAddress(+id, updateUserAddressDto);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Get a list of all past orders for a user' })
  @ApiResponse({ status: 200, description: 'List of user orders', type: Order, isArray: true })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  findAllOrders(@Param('id') id: string): Promise<Order[]> {
    return this.usersService.findAllOrders(+id);
  }

  @Post(':id/orders')
  @ApiOperation({ summary: 'Create a new order for a user' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: Order })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  @ApiBody({ type: CreateOrderDto })
  makeOrder(
    @Param('id') id: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.usersService.makeOrder(+id, createOrderDto);
  }

  @Patch(':id/orders/:orderId/cancel')
  @ApiOperation({ summary: 'Cancel a pending order for a user' })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully', type: Order })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  cancelOrder(
    @Param('id') id: string,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return this.usersService.cancelOrder(+orderId, +id);
  }

  @Patch(':id/orders/:orderId/complete')
  @ApiOperation({ summary: 'Complete a pending order for a user' })
  @ApiResponse({ status: 200, description: 'Order completed successfully', type: Order })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  completeOrder(
    @Param('id') id: string,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return this.usersService.completeOrder(+orderId, +id);
  }

  @Get(':id/pizza/recommended')
  @ApiOperation({ summary: 'Get the recommended pizza for a user' })
  @ApiResponse({ status: 200, description: 'Recommended pizza for the user', type: Pizza })
  @ApiParam({ name: 'id', description: 'User ID' , example: 1})
  getRecommendedPizza(@Param('id') id: string): Promise<Pizza> {
    return this.usersService.getRecommendedPizza(+id);
  }
}

