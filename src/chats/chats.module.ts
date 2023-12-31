import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { UsersModule } from 'src/users/users.module';
import { PizzasModule } from 'src/pizzas/pizzas.module';
import { DialogflowService } from './dialogflow.service';

@Module({
  imports: [UsersModule, PizzasModule],
  controllers: [ChatsController],
  providers: [ChatsService, DialogflowService],
})
export class ChatsModule {}
