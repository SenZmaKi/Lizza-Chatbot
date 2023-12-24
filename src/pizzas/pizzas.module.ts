import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaEntity } from './entities/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PizzaEntity])],
  controllers: [PizzasController],
  providers: [PizzasService],
})
export class PizzasModule {}
