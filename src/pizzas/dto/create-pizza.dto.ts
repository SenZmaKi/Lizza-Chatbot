import { PartialType } from '@nestjs/mapped-types';
import { PizzaEntity } from '../entities/pizza.entity';

export class CreatePizzaDto extends PartialType(PizzaEntity) {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}
