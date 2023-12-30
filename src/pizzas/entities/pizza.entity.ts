import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Pizza extends AbstractEntity {
  @Column()id
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToMany(() => Order, (order) => order.pizzas )
  orders: Order[];


  static create(
    name: string,
    imageUrl: string,
    price: number,
    quantity: number,
  ): Pizza {
    const pizza = new Pizza();
    pizza.name = name;
    pizza.imageUrl = imageUrl;
    pizza.price = price;
    pizza.quantity = quantity;
    return pizza;
  }
}
