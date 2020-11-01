import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { FindQuery } from '../impl/find.query';
import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { FindPaginatedQuery } from '../impl/find-paginated.query';

@QueryHandler(FindPaginatedQuery)
export class FindPaginatedHandler<T>
  implements IQueryHandler<FindPaginatedQuery> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async execute(query: FindPaginatedQuery): Promise<IPaginatedData<T>> {
    return this.repository.findPaginated(
      query.filter,
      query.paginator,
      query.populate,
      query.select,
      query.sort,
    );
  }
}
