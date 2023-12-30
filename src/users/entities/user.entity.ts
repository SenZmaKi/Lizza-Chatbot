import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column()
  firstName: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column()
  address: string;

  static create(firstName: string, address: string): User {
    const user = new User();
    user.firstName = firstName;
    user.address = address;
    return user;
  }
}
