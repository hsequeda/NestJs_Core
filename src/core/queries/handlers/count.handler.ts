import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { FilterQuery } from '../impl/filter.query';

@QueryHandler(FilterQuery)
export class CountHandler<T> implements IQueryHandler<FilterQuery> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(query: FilterQuery): Promise<number> {
    return await this._orm.count(query.filter);
  }
}
