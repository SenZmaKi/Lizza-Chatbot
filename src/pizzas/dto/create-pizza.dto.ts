import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePizzaDto {
  @ApiProperty({ example: 'Margherita', description: 'The name of the pizza'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'margherita.jpg', description: 'The name of the image file, this will be used to find the image in the images/pizza-images folder'})
  @IsString()
  @IsNotEmpty()
  imageName: string;

  @ApiProperty({ example: 10.99, description: 'The price of the pizza'})
  @IsNumber()
  price: number;

  @ApiProperty({ example: 100, description: 'The quantity of the pizza'})
  @IsNumber()
  quantity: number;
}
