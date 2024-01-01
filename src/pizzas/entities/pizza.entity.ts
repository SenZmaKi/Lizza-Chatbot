// pizza.entity.ts
import * as path from 'path';
import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { PIZZA_IMAGES_FOLDER_PATH } from 'src/constants';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pizza extends AbstractEntity {
  @ApiProperty({ example: 'Margherita', description: 'The name of the pizza' })
  @Column()
  name: string;

  @ApiProperty({ example: '<root-folder>/images/pizza-images/margherita.jpg', description: 'The absolute path to the image file' })
  @Column()
  imageUrl: string;

  @ApiProperty({ example: 10.99, description: 'The price of the pizza' })
  @Column()
  price: number;

  @ApiProperty({ example: 100, description: 'The quantity of the pizza'})
  @Column()
  quantity: number;

  @ManyToMany(() => Order, (order) => order.pizzas)
  orders: Order[];

  static joinFromPizzaImagesFolder(imageName: string): string {
    const relPath = PIZZA_IMAGES_FOLDER_PATH + imageName;
    return path.resolve(relPath);
  }

  static create(
    name: string,
    imageName: string,
    price: number,
    quantity: number,
  ): Pizza {
    const pizza = new Pizza();
    pizza.name = name;
    pizza.imageUrl = Pizza.joinFromPizzaImagesFolder(imageName);
    pizza.price = price;
    pizza.quantity = quantity;
    return pizza;
  }
}
