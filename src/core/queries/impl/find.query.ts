import { BaseQuery } from './base.query';

export class FindQuery extends BaseQuery {
  constructor(
    public filter: any,
    public populate?: any,
    public select?: any,
    public sort?: any,
    public skip?: number,
    public limit?: number,
  ) {
    super();
  }
}
