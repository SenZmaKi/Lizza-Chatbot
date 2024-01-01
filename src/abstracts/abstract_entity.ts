import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier', example: 1 })
  id: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date of creation', example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date of last update', example: '2021-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
