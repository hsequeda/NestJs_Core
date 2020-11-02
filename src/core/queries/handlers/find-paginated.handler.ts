import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { FindQuery } from '../impl/find.query';
import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { FindPaginatedQuery } from '../impl/find-paginated.query';

@QueryHandler(FindPaginatedQuery)
export class FindPaginatedHandler<T>
  implements IQueryHandler<FindPaginatedQuery> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(query: FindPaginatedQuery): Promise<IPaginatedData<T>> {
    return this._orm.findPaginated(query.filter, query.page);
  }
}
