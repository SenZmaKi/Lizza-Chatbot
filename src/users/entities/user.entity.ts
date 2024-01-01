import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class User extends AbstractEntity {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Column()
  firstName: string;

  @ApiProperty({ example: [{ id: 1, quantity: 2 }], type: () => [Order], description: 'List of user orders' })
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ApiProperty({ example: '123 Main Street', description: 'The address of the user' })
  @Column()
  address: string;

  /**
   * Factory method to create a new user instance.
   *
   * @param {string} firstName - The first name of the user.
   * @param {string} address - The address of the user.
   * @returns {User} - A new user instance.
   */
  static create(firstName: string, address: string): User {
    const user = new User();
    user.firstName = firstName;
    user.address = address;
    return user;
  }
}
