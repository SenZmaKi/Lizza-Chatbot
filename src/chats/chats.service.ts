import { Inject, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DialogflowService } from './dialogflow.service';
import { PizzasService } from 'src/pizzas/pizzas.service';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

enum Intent {
  ListMenu = 'ListMenu',
  ListOrders = 'ListOrders',
  MakeOrder = 'MakeOrder',
  RecommendPizza = 'RecommendPizza',
  Default = 'Default',
}
type ResponseData = Pizza | Pizza[] | Order[] | Order | null;
export class MessageResponse {
  @ApiProperty({
    example: 'Here is your recommendation',
    description: 'The response text',
  })
  text: string;

  @ApiProperty({
    enum: Intent,
    example: `"${Intent.RecommendPizza}"`,
    description:
      'The intent that triggered the response, as in what the bot detects the user is trying to accomplish.',
  })
  intent: Intent;
  @ApiProperty({
    enum: ['null', 'Pizza', 'Order', , 'Pizza[]', 'Order[]'],
    example: { id: 1, name: 'Margherita', price: 10.99, quantity: 100 },
    description:
      'The response data. Can either be null if it\'s  a "Default" intent i.e., one that doesn\'t involve database operations OR an array of pizzas if it\'s a "ListMenu" intent OR an array of orders if it\'s a "ListOrders" intent OR a pizza if it\'s a "RecommendPizza" intent OR an order if it\'s a  "MakeOrder" intent.',
  })
  data: ResponseData;

  constructor(text: string, intent: Intent, data: ResponseData) {
    this.text = text;
    this.intent = intent;
    this.data = data;
  }
}

export class ChatsService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(PizzasService)
    private readonly pizzasService: PizzasService,
    @Inject(DialogflowService)
    private readonly dialogflowService: DialogflowService,
  ) {}

  defaultIntentResponse(text: string): MessageResponse {
    return new MessageResponse(text, Intent.Default, null);
  }
  async listMenu(): Promise<MessageResponse> {
    const pizzas = await this.pizzasService.findAll();
    return new MessageResponse('Here is the menu', Intent.ListMenu, pizzas);
  }

  async listUserOrders(userId: number): Promise<MessageResponse> {
    const orders = await this.usersService.findAllOrders(userId);
    return new MessageResponse(
      'Here are your orders',
      Intent.ListOrders,
      orders,
    );
  }

  async makeOrder(userId: number, pizzaName: string): Promise<MessageResponse> {
    const pizza = await this.pizzasService.findByName(pizzaName);
    const pizzaIds = [pizza.id];
    const order = await this.usersService.makeOrder(userId, { pizzaIds });
    return new MessageResponse(
      'Your order has been placed',
      Intent.MakeOrder,
      order,
    );
  }

  async recommendPizza(userId: number): Promise<MessageResponse> {
    const pizza = await this.usersService.getRecommendedPizza(userId);
    return new MessageResponse(
      'Here is your recommendation',
      Intent.RecommendPizza,
      pizza,
    );
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
      case Intent.ListMenu:
        return await this.listMenu();
      case Intent.ListOrders:
        return await this.listUserOrders(userId);
      case Intent.MakeOrder:
        const pizzaName =
          queryResult.parameters.fields['pizzaName'].stringValue;
        return pizzaName
          ? await this.makeOrder(userId, pizzaName)
          : this.defaultIntentResponse(queryResult.fulfillmentText);
      case Intent.RecommendPizza:
        return await this.recommendPizza(userId);
      default:
        return this.defaultIntentResponse(queryResult.fulfillmentText);
    }
  }
}
