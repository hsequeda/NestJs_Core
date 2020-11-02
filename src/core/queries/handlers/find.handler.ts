import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { FindQuery } from '../impl/find.query';

@QueryHandler(FindQuery)
export class FindHandler<T> implements IQueryHandler<FindQuery> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(query: FindQuery): Promise<T[]> {
    return this._orm.find(query.filter);
  }
}
