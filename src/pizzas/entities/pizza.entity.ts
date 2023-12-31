import * as path from 'path';
import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { PIZZA_IMAGES_FOLDER_PATH } from 'src/constants';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Pizza extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToMany(() => Order, (order) => order.pizzas)
  orders: Order[];

  static joinFromPizzaImagesFolder(imageName: string): string {
    return PIZZA_IMAGES_FOLDER_PATH + imageName;
  }

  static create(
    name: string,
    imageUrl: string,
    price: number,
    quantity: number,
  ): Pizza {
    const pizza = new Pizza();
    pizza.name = name;
    pizza.imageUrl = path.resolve(imageUrl);
    pizza.price = price;
    pizza.quantity = quantity;
    return pizza;
  }
}
