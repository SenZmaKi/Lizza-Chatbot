import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.pizzasService.create(createPizzaDto);
  }

  @Get()
  findAll(): Promise<Pizza[]> {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<Pizza> {
    return this.pizzasService.find(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza> {
    return this.pizzasService.update(+id, updatePizzaDto);
  }
}
