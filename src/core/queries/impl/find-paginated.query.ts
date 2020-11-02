import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';
import { BaseQuery } from './base.query';
import { FindManyOptions } from 'typeorm';

export class FindPaginatedQuery extends BaseQuery {
  constructor(public filter?: FindManyOptions, public page?: number) {
    super();
  }
}
