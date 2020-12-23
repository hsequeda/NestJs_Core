import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PaginatedFindCompanyQuery } from '../impl/paginated-find-company.query';
import { PaginatedFindCompanyUseCase } from '../../useCases/paginatedFindCompany/paginated-find-company.use-case';

@QueryHandler(PaginatedFindCompanyQuery)
export class PaginatedFindCompanyHandler
  implements IQueryHandler<PaginatedFindCompanyQuery> {
  constructor(
    private readonly _paginatedFindCompanyUseCase: PaginatedFindCompanyUseCase,
  ) {}
  execute({ input }: PaginatedFindCompanyQuery): Promise<any> {
    return this._paginatedFindCompanyUseCase.execute(input);
  }
}
