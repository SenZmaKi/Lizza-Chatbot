import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = this.repository.create(createOrderDto);
    return this.repository.save(order);
  }

  async findOne(id: number): Promise<OrderEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    await this.repository.update(id, updateOrderDto);
    return this.findOne(id);
  }
}
