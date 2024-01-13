import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePizzaDto {
  @ApiProperty({ example: 'Margherita', description: 'The name of the pizza' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'margherita.jpg',
    description:
      'The name of the image file, this will be used to find the image in the images/pizza-images folder',
  })
  @IsString()
  @IsNotEmpty()
  imageName: string;

  @ApiProperty({ example: 10.99, description: 'The price of the pizza' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 100, description: 'The quantity of the pizza' })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: `The Margherita pizza is a classic Italian pizza known for its simplicity and delicious flavors. It
  features a thin crust topped with fresh, high-quality ingredients. The key components include tomato sauce, fresh
  mozzarella cheese, basil leaves, and a drizzle of olive oil. The combination of these elements creates a harmonious   
  and satisfying pizza experience, allowing the natural flavors to shine through. The Margherita pizza is a timeless    
  favorite, celebrated for its traditional and authentic taste.`,
    description: 'A desctiption of the pizza',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
