import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Repository } from 'typeorm';
import { PizzasService } from 'src/pizzas/pizzas.service';
import { User } from 'src/users/entities/user.entity';
import { Pizza } from 'src/pizzas/entities/pizza.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @Inject(PizzasService)
    private readonly pizzasService: PizzasService,
  ) {}
  async create(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    const pizzas = await this.fetchPizzas(createOrderDto.pizzaIds);
    await this.updatePizzaQuantity(pizzas, true);
    const updatedPizzas = await this.fetchPizzas(createOrderDto.pizzaIds);
    const first = updatedPizzas[0];
    const order = Order.create(user, updatedPizzas);
    const savedOrder = this.repository.save(order);
    return savedOrder;
  }

  async fetchPizzas(pizzaIds: number[]): Promise<Pizza[]> {
    const pizzasPromise = pizzaIds.map((pizzaId) =>
      this.pizzasService.find(pizzaId),
    );
    const pizzas = await Promise.all(pizzasPromise);
    for (let [idx, p] of pizzas.entries()) {
      if (!p) {
        throw new NotFoundException(`Pizza with id ${pizzaIds[idx]} not found`);
      }
    }
    return pizzas;
  }
  async find(id: number): Promise<Order> {
    return this.repository.findOneBy({ id });
  }

  async findAllForUser(id: number): Promise<Order[]> {
    return this.repository.find({ where: { user: { id: id } } });
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find();
  }
  async updatePizzaQuantity(
    pizzas: Pizza[],
    decrement: boolean,
  ): Promise<void> {
    for (let p of pizzas) {
      const quantity = decrement ? p.quantity - 1 : p.quantity + 1;
      await this.pizzasService.update(p.id, { quantity });
    }
  }

  async cancelOrder(id: number, userId: number): Promise<Order> {
    await this.updateStatus(id, userId, {
      status: OrderStatus.Cancelled,
    });
    const order = await this.find(id);
    await this.updatePizzaQuantity(order.pizzas, false);
    return this.find(id);
  }
  async completeOrder(id: number, userId: number): Promise<Order> {
    return await this.updateStatus(id, userId, { status: OrderStatus.Completed });
  }

  async updateStatus(
    id: number,
    userId: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.find(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    if (order.user.id !== userId) {
      throw new ForbiddenException(
        'Invalid User ID',
        `User with id ${userId} is not allowed to update order with id ${id}`,
      );
    }
    if (order.status !== OrderStatus.Pending) {
      throw new BadRequestException(
        `Order is already ${order.status.toLowerCase()}`,
        'Order status must be pending to update',
      );
    }
    await this.repository.update(id, updateOrderStatusDto);
    return this.find(id);
  }
}
