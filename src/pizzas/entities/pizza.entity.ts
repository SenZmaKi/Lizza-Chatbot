// pizza.entity.ts
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

  @ApiProperty({ example: 1000.99, description: 'The price of the pizza' })
  @Column()
  price: number;

  @ApiProperty({
    example: `The Margherita pizza is a classic Italian pizza known for its simplicity and delicious flavors. It       
  features a thin crust topped with fresh, high-quality ingredients. The key components include tomato sauce, fresh   
  mozzarella cheese, basil leaves, and a drizzle of olive oil. The combination of these elements creates a harmonious 
  and satisfying pizza experience, allowing the natural flavors to shine through. The Margherita pizza is a timeless  
  favorite, celebrated for its traditional and authentic taste.
`,
    description: 'A desctiption of the pizza',
  })
  @Column()
  description: string;

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
    desctiption: string
  ): Pizza {
    const pizza = new Pizza();
    pizza.name = name;
    pizza.imageUrl = Pizza.joinFromPizzaImages(imageName);
    pizza.price = price;
    pizza.quantity = quantity;
    pizza.description = desctiption;
    return pizza;
  }
}
