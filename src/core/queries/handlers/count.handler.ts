import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { FilterQuery } from '../impl/filter.query';

@QueryHandler(FilterQuery)
export class CountHandler<T> implements IQueryHandler<FilterQuery> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async execute(query: FilterQuery): Promise<number> {
    return await this.repository.count(query.filter);
  }
}
