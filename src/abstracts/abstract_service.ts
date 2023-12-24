// Work in Progress

// import { Repository } from 'typeorm';
//
// export abstract class AbstractService<T> {
//   constructor(private readonly repository: Repository<T>) {}
//
//   async create(createDto: any): Promise<T> {
//     const entity = this.repository.create(createDto);
//     return this.repository.save(entity);
//   }
//
//   async findAll(): Promise<T[]> {
//     return this.repository.find();
//   }
//
//   async findOne(id: number): Promise<T> {
//     return this.repository.findOneBy({ id });
//   }
//
//   async update(id: number, updateDto: any): Promise<T> {
//     await this.repository.update(id, updateDto);
//     return this.findOne(id);
//   }
//
//   async remove(id: number): Promise<T> {
//     const removed = await this.findOne(id);
//     await this.repository.remove(removed);
//     return removed;
//   }
// }
