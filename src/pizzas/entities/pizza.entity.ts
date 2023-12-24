import { AbstractEntity } from 'src/abstracts/abstract_entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PizzaEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
