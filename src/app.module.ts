import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_PATH, DEBUG } from './constants';

@Module({
  imports: [
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite', //TODO: Swap to msql database
      database: DATABASE_PATH,
      synchronize: DEBUG,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
