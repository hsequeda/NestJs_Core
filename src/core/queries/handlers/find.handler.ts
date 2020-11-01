import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { FindQuery } from '../impl/find.query';

@QueryHandler(FindQuery)
export class FindHandler<T> implements IQueryHandler<FindQuery> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async execute(query: FindQuery): Promise<T[]> {
    return this.repository.find(
      query.filter,
      query.populate,
      query.select,
      query.sort,
      query.skip,
      query.limit,
    );
  }
}
