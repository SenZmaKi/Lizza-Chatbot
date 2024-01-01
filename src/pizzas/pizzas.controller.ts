import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * @description Responsible for handling all requests to the /pizzas endpoint
 */
@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @ApiTags('pizzas')
  @ApiOperation({ summary: 'Create a new pizza' })
  @ApiResponse({ status: 201, description: 'Pizza created successfully', type: Pizza })
  @ApiBody({ type: CreatePizzaDto })
  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.pizzasService.create(createPizzaDto);
  }

  @ApiTags('pizzas')
  @ApiOperation({ summary: 'Get a list of all pizzas' })
  @ApiResponse({ status: 200, description: 'List of pizzas', type: Pizza, isArray: true })
  @Get()
  findAll(): Promise<Pizza[]> {
    return this.pizzasService.findAll();
  }

  @ApiTags('pizzas')
  @ApiOperation({ summary: 'Get a pizza' })
  @ApiResponse({ status: 200, description: 'Pizza found successfully', type: Pizza })
  @ApiParam({ name: 'id', description: 'Pizza ID', example: 1 })
  @Get(':id')
  find(@Param('id') id: string): Promise<Pizza> {
    return this.pizzasService.find(+id);
  }

  @ApiTags('pizzas')
  @ApiOperation({ summary: 'Update a pizza' })
  @ApiResponse({ status: 200, description: 'Pizza updated successfully', type: Pizza })
  @ApiParam({ name: 'id', description: 'Pizza ID', example: 1 })
  @ApiBody({ type: UpdatePizzaDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza> {
    return this.pizzasService.update(+id, updatePizzaDto);
  }
}
