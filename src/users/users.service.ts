// users.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAddressDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { PizzasService } from 'src/pizzas/pizzas.service';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { Order } from 'src/orders/entities/order.entity';
import { REFRESH_DATABASE, databaseFileExists } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(OrdersService)
    private readonly ordersService: OrdersService,
    @Inject(PizzasService)
    private readonly pizzasService: PizzasService,
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    if (REFRESH_DATABASE && !databaseFileExists()) {
      this.populateDatabase();
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.repository.save(createUserDto);
  }
  async find(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async updateAddress(
    id: number,
    updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<User> {
    await this.repository.update(id, updateUserAddressDto);
    return this.find(id);
  }

  async findAllOrders(id: number): Promise<Order[]> {
    return this.ordersService.findAllForUser(id);
  }

  async makeOrder(id: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.find(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const order = await this.ordersService.create(user, createOrderDto);
    return order;
  }

  async cancelOrder(id: number, userId: number): Promise<Order> {
    return this.ordersService.cancelOrder(id, userId);
  }
  async completeOrder(id: number, userId: number): Promise<Order> {
    return this.ordersService.completeOrder(id, userId);
  }

  // TODO: Implement proper recommendation
  async getRecommendedPizza(id: number): Promise<Pizza> {
    const pizzas = await this.pizzasService.findAll();
    const randomIdx = Math.floor(Math.random() * pizzas.length);
    return pizzas ? pizzas[randomIdx] : null;
  }
  async populatePizzas(): Promise<void> {
    const pizzaData = [
      {
        name: 'Margherita',
        imageName: 'margherita.jpg',
        price: 1000,
        quantity: 100,
        description: `A classic Italian pizza known for its explosive and delicious flavors.`,
      },
      {
        name: 'Pepperoni',
        imageName: 'pepperoni.jpg',
        price: 1200,
        quantity: 80,
        description: `A beloved variety known for its simple yet satisfying combination of flavors.`,
      },
      {
        name: 'Vegetarian',
        imageName: 'vegetarian.jpg',
        price: 1130,
        quantity: 90,
        description: `A delightful option that caters to those who prefer a plant-based culinary experience.`,
      },
      {
        name: 'Hawaiian',
        imageName: 'hawaiian.jpg',
        price: 1300,
        quantity: 75,
        description: `A tropical delight that brings a sweet and savory twist to the classic pizza experience.`,
      },

      {
        name: 'BBQ Chicken',
        imageName: 'bbq-chicken.jpg',
        price: 1450,
        quantity: 85,
        description: `A delectable fusion of savory and sweet flavors, creating a culinary delight for pizza lovers.`,
      },
    ];

    await Promise.all(
      pizzaData.map(async (v) => await this.pizzasService.create(v)),
    );
  }
  async populateUsers(): Promise<void> {
    const userData = [
      { firstName: 'John', address: '123 Main Street' },
      { firstName: 'Alice', address: '456 Oak Avenue' },
      { firstName: 'David', address: '789 Elm Lane' },
      { firstName: 'Emily', address: '101 Pine Road' },
      { firstName: 'Michael', address: '202 Cedar Drive' },
    ];
    await Promise.all(userData.map(async (v) => await this.create(v)));
  }

  async populateOrders(): Promise<void> {
    const users = await this.findAll();
    const ordersData = [
      { user: users[0], pizzaIds: [1, 2] },
      { user: users[0], pizzaIds: [3] },
      { user: users[2], pizzaIds: [4, 2, 1] },
      { user: users[4], pizzaIds: [5, 2] },
      { user: users[4], pizzaIds: [2, 3] },
      { user: users[3], pizzaIds: [5, 2, 3, 4] },
      { user: users[1], pizzaIds: [4, 1] },
    ];

    for (let orderData of ordersData) {
      const order = await this.ordersService.create(orderData.user, {
        pizzaIds: orderData.pizzaIds,
      });
      await this.ordersService.completeOrder(order.id, order.user.id);
    }
  }

  async populateDatabase(): Promise<void> {
    await this.populateUsers();
    await this.populatePizzas();
    await this.populateOrders();
  }
}
