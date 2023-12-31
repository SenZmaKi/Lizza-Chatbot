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
    const pizza = Pizza.create(
      createPizzaDto.name,
      createPizzaDto.imageUrl,
      createPizzaDto.price,
      createPizzaDto.quantity,
    );
    return this.repository.save(pizza);
  }

  async findAll(): Promise<Pizza[]> {
    return this.repository.find();
  }

  find(id: number): Promise<Pizza> {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string): Promise<Pizza> {
    return this.repository.findOneBy({ name });
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    await this.repository.update(id, updatePizzaDto);
    return this.find(id);
  }
}
