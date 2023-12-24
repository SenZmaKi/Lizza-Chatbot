import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaEntity } from './entities/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(PizzaEntity)
    private readonly repository: Repository<PizzaEntity>,
  ) {}
  async create(createPizzaDto: CreatePizzaDto): Promise<PizzaEntity> {
    const pizza = this.repository.create(createPizzaDto);
    return this.repository.save(pizza);
  }

  async findAll(): Promise<PizzaEntity[]> {
    return this.repository.find();
  }

  find(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    updatePizzaDto: UpdatePizzaDto,
  ): Promise<PizzaEntity> {
    await this.repository.update(id, updatePizzaDto);
    return this.find(id);
  }

  async remove(id: number): Promise<PizzaEntity> {
    const removed = await this.find(id);
    this.repository.remove(removed);
    return removed;
  }
}
