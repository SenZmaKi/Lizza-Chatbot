import { PartialType } from '@nestjs/mapped-types';
import { CreatePizzaDto } from './create-pizza.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidatorConstraint } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {
    @ApiProperty({ example: 'Margherita', description: 'The name of the pizza'})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
    
    @ApiProperty({ example: 'margherita.jpg', description: 'The name of the image file, this will be used to find the image in the images/pizza-images folder'})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    imageName?: string;

    @ApiProperty({ example: 10.99, description: 'The price of the pizza'})
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({ example: 100, description: 'The quantity of the pizza'})
    @IsOptional()
    @IsNumber()
    quantity?: number;

    imageUrl?: string;
}
