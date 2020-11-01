import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { BaseEntity } from 'src/core/entity/base.entity';
import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';
import { BaseInput } from '../input/base.input';

@Injectable()
export class BaseRepository<T extends BaseEntity> {

  constructor( private repository: Repository<T>) {
  }


  async findPaginated(filter: FindManyOptions<T>, page: number): Promise<IPaginatedData<T>> {

    filter.take  = filter.take ? filter.take : 25;
    const count = await this.repository.count(filter);
    return {
      total: count,
      pages: Math.ceil(count / filter.take),
      currentPage: page,
      items: await this.repository.find(filter),
    };
  }

  async find(filter: FindManyOptions<T>): Promise<T[] | any> {
    return await this.repository.find(filter);

  }


  async findOne(filter: FindOneOptions = {}): Promise<T> {
    return await this.repository.findOne(filter);

  }


  async create(item: T | BaseInput | any): Promise<T> {
    return this.repository.save(item);
  }

  async delete(criteria: any): Promise<DeleteResult> {
    return await this.repository.delete(criteria);
  }


  async update(criteria: any, data: T | BaseInput | any): Promise<UpdateResult> {
    return await this.repository.update(criteria, data);
  }


  async count(filter: FindManyOptions): Promise<number> {
    return await this.repository.count(filter);
  }

}
