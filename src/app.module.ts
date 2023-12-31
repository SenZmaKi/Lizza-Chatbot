import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_PATH, DEBUG, LOCAL_ENV_FILE_PATH } from './constants';
import { PizzasModule } from './pizzas/pizzas.module';
import { UsersModule } from './users/users.module';
import { debugSetup as setupDebug } from './constants';
import { ChatsModule } from './chats/chats.module';
import { configDotenv } from 'dotenv';
if (DEBUG) {
  setupDebug();
}
configDotenv();
configDotenv({path: LOCAL_ENV_FILE_PATH})

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', //TODO: Swap to postgresql database
      database: DATABASE_PATH,
      synchronize: DEBUG,
      autoLoadEntities: true,
    }),
    OrdersModule,
    PizzasModule,
    UsersModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
  }
}
