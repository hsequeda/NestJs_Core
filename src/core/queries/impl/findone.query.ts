import { BaseQuery } from './base.query';
import { FindOneOptions } from 'typeorm';

export class FindOneQuery extends BaseQuery {
  constructor(public filter?: FindOneOptions) {
    super();
  }
}
