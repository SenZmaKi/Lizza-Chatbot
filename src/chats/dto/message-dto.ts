import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty({example: 'Recommend me something', description: 'The message text'})
  @IsString()
  @IsNotEmpty()
  text: string;
}
