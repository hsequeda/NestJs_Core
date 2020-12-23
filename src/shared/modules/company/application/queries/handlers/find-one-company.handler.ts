import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindOneCompanyQuery } from '../impl/find-one-company.query';
import { FindOneCompanyUseCase } from '../../useCases/findOneCompany/findone-company.use-case';

@QueryHandler(FindOneCompanyQuery)
export class FindOneCompanyHandler
  implements IQueryHandler<FindOneCompanyQuery> {
  constructor(private readonly _findOneCompanyUseCase: FindOneCompanyUseCase) {}
  execute({ input }: FindOneCompanyQuery): Promise<any> {
    return this._findOneCompanyUseCase.execute(input);
  }
}
