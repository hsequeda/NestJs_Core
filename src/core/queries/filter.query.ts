import { BaseQuery } from './base.query';

export class FilterQuery extends BaseQuery {
  constructor(public where?: any) {
    super();
  }
}
