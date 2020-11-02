import { BaseQuery } from './base.query';
import { FindManyOptions } from 'typeorm';

export class FilterQuery extends BaseQuery {
  constructor(public filter?: FindManyOptions) {
    super();
  }
}
