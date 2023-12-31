import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Repository } from 'typeorm';
import { PizzasService } from 'src/pizzas/pizzas.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @Inject(PizzasService)
    private readonly pizzasService: PizzasService,
  ) {}
  async create(
    user: User,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const pizzasPromise = createOrderDto.pizzaIds.map((pizzaId) =>
      this.pizzasService.find(pizzaId),
    );
    const pizzas = await Promise.all(pizzasPromise);
    const order = Order.create(user, pizzas);
    return this.repository.save(order);
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
  async cancelOrder(
    id: number,
    userId: number,
  ): Promise<Order> {
    return this.updateStatus(id, userId, { status: OrderStatus.Cancelled });
  }
  async completeOrder(
    id: number,
    userId: number,
  ): Promise<Order> {
    return this.updateStatus(id, userId, { status: OrderStatus.Completed });
  }

  async updateStatus(
    id: number,
    userId: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.find(id);
    if (order.user.id !== userId) {
      throw new ForbiddenException(
        'Invalid User ID',
        'This order does not belong to the user with the provided id',
      );
    }
    await this.repository.update(id, updateOrderStatusDto);
    return this.find(id);
  }
}
