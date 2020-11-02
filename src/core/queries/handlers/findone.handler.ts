import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { FindOneQuery } from '../impl/findone.query';

@QueryHandler(FindOneQuery)
export class FindOneHandler<T> implements IQueryHandler<FindOneQuery> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(query: FindOneQuery): Promise<T> {
    return await this._orm.findOne(query.filter);
  }
}
