import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';
import { BaseQuery } from './base.query';

export class FindPaginatedQuery extends BaseQuery {
  constructor(
    public filter: any,
    public paginator: IPaginatorParams,
    public populate?: any,
    public select?: any,
    public sort?: any,
  ) {
    super();
  }
}
