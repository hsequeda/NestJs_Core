import { BaseQuery } from './base.query';

export class FilterQuery extends BaseQuery {
  constructor(public filter?: any) {
    super();
  }
}
