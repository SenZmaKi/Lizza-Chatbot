// create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ example: [1, 2], description: 'An array of pizza IDs' })
  pizzaIds: number[];
}
