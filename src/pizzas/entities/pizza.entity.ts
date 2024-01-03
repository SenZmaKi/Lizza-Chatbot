// pizza.entity.ts
import * as path from 'path';
import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GITHUB_RAW_ENTRYPOINT } from 'src/constants';

@Entity()
export class Pizza extends AbstractEntity {
  @ApiProperty({ example: 'Margherita', description: 'The name of the pizza' })
  @Column()
  name: string;

  @ApiProperty({
    example: Pizza.joinFromPizzaImages('margherita.jpg'),
    description: 'The absolute path to the image file',
  })
  @Column()
  imageUrl: string;

  @ApiProperty({ example: 10.99, description: 'The price of the pizza' })
  @Column()
  price: number;

  @ApiProperty({ example: 100, description: 'The quantity of the pizza' })
  @Column()
  quantity: number;

  @ManyToMany(() => Order, (order) => order.pizzas)
  orders: Order[];

  static joinFromPizzaImages(imageName: string): string {
    return `${GITHUB_RAW_ENTRYPOINT}database/images/pizza-images/${imageName}`;
  }

  static create(
    name: string,
    imageName: string,
    price: number,
    quantity: number,
  ): Pizza {
    const pizza = new Pizza();
    pizza.name = name;
    pizza.imageUrl = Pizza.joinFromPizzaImages(imageName);
    pizza.price = price;
    pizza.quantity = quantity;
    return pizza;
  }
}
