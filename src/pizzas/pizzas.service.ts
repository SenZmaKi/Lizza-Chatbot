import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private readonly repository: Repository<Pizza>,
  ) {}
  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.repository.save(createPizzaDto);
  }

  async findAll(): Promise<Pizza[]> {
    return this.repository.find();
  }

  find(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza> {
    await this.repository.update(id, updatePizzaDto);
    return this.find(id);
  }

}
