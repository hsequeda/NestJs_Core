import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { FindOneQuery } from '../impl/findone.query';

@QueryHandler(FindOneQuery)
export class FindOneHandler<T> implements IQueryHandler<FindOneQuery> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async execute(query: FindOneQuery): Promise<T> {
    return await this.repository.findOne(
      query.filter,
      query.populate,
      query.select,
    );
  }
}
