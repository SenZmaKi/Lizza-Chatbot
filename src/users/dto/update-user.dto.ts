// update-user.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User address', example: '123 Main Street' })
  address: string;
}
