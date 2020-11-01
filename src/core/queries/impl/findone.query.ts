import { BaseQuery } from './base.query';

export class FindOneQuery extends BaseQuery {
  constructor(public filter?: any, public populate?: any, public select?: any) {
    super();
  }
}
