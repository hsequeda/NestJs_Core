import { Injectable } from '@nestjs/common';

import { BaseEntity } from 'src/core/entity/base.entity';
import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseInput } from '../input/base.input';

@Injectable()
export class BaseOrm<T> {
  /**
   * @param repo
   *    is TypeOrm orm for your given Entity <T>.
   *    (the intermediary object, which does all the work on the db end).
   */
  constructor(public _repository: Repository<T>) {}

  async findPaginated(
    filter: FindManyOptions<T>,
    page: number,
  ): Promise<IPaginatedData<T>> {
    /*paginator = paginator ? paginator : { page: 1, limit: 25 };
    paginator.limit = paginator.limit ? paginator.limit : 25;
    const count = await this.model.countDocuments(filter);
    return {
      total: count,
      pages: Math.ceil(count / paginator.limit),
      currentPage: paginator.page,
      items: await this.model.find(filter)
        .limit(paginator.limit * 1)
        .select(select)
        .populate(populate)
        .sort(sort)
        .skip((paginator.page - 1) * paginator.limit)
        .lean()
    }*/
    return null;
  }

  async find(filter: FindManyOptions<T>): Promise<T[]> {
    return this._repository.find(filter);
  }

  async findOne(filter: FindOneOptions<T>): Promise<T> {
    return this._repository.findOne(filter);
  }

  async save(item: T | BaseInput | any): Promise<T> {
    return this._repository.save(item);
  }

  async delete(criteria: any): Promise<DeleteResult> {
    return this._repository.delete(criteria);
  }

  async update(criteria: any, item: T | any): Promise<UpdateResult> {
    return this._repository.update(criteria, item);
  }

  async count(filter: FindManyOptions<T>): Promise<number> {
    return this._repository.count(filter);
  }
}
