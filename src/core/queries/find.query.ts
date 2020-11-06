import { BaseQuery } from './base.query';
import { FindManyOptions } from 'typeorm';

export class FindQuery extends BaseQuery {
  constructor(public filter?: FindManyOptions) {
    super();
  }
}
