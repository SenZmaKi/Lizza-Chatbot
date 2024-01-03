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
      createPizzaDto.imageName,
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
    // a case insensitive sql query
    return this.repository
      .createQueryBuilder('pizza')
      .select()
      .where('LOWER(pizza.name) = LOWER(:name)', { name })
      .getOne();
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    if (updatePizzaDto.imageName) {
      updatePizzaDto.imageUrl = Pizza.joinFromPizzaImages(
        updatePizzaDto.imageName,
      );
      delete updatePizzaDto.imageName;
    }
    await this.repository.update(id, updatePizzaDto);
    return this.find(id);
  }
}
