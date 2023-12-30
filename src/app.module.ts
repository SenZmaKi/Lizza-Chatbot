import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_PATH, DEBUG } from './constants';
import { PizzasModule } from './pizzas/pizzas.module';
import { UsersModule } from './users/users.module';
import { debugSetup } from './constants';
debugSetup();

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
