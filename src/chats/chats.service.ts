import { Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DialogflowService } from './dialogflow.service';
import { PizzasService } from 'src/pizzas/pizzas.service';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { Order } from 'src/orders/entities/order.entity';

export type MessageResponse = string | Pizza | Pizza[] | Order[] | Order;
export class ChatsService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(PizzasService)
    private readonly pizzasService: PizzasService,
    @Inject(DialogflowService)
    private readonly dialogflowService: DialogflowService,
  ) {}

  defaultIntentHandler(responseMsg: string): string {
    return responseMsg;
  }
  async listMenu(): Promise<Pizza[]> {
    return this.pizzasService.findAll();
  }

  async listUserOrders(userId: number): Promise<Order[]> {
    return this.usersService.findAllOrders(userId);
  }

  async makeOrder(userId: number, pizzaName: string): Promise<Order> {
    const pizza = await this.pizzasService.findByName(pizzaName);
    const pizzaIds = [pizza.id];
    return this.usersService.makeOrder(userId, { pizzaIds });
  }

  async recommendPizza(userId: number): Promise<Pizza> {
    return this.usersService.getRecommendedPizza(userId);
  }

  async fetchResponse(
    userId: number,
    message: string,
  ): Promise<MessageResponse> {
    const response = await this.dialogflowService.detectIntent(
      userId.toString(),
      message,
    );
    const queryResult = response.queryResult;
    switch (queryResult.intent.displayName) {
      case 'List Menu':
        return this.listMenu();
      case 'List Orders':
        return this.listUserOrders(userId);
      case 'Make Order':
        const pizzaName =
          queryResult.parameters.fields['pizzaName'].stringValue;
        return pizzaName
          ? this.makeOrder(userId, pizzaName)
          : this.defaultIntentHandler(queryResult.fulfillmentText);
      case 'Recommend Pizza':
        return this.recommendPizza(userId);
      default:
        return this.defaultIntentHandler(queryResult.fulfillmentText);
    }
  }
}
