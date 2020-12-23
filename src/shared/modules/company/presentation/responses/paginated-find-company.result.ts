import { ObjectType } from '@nestjs/graphql';
import getGenericPaginatedFindResult from 'src/shared/core/presentation/responses/paginated-find.response';
import { CompanyResp } from './company.resp';
import { Company } from '../../domain/entities/company.entity';
import { CompanyMap } from '../../infrastructure/mapper/company.mapper';

@ObjectType()
export class PaginatedFindCompanyResult extends getGenericPaginatedFindResult(
  CompanyResp,
) {
  constructor(
    items: Company[],
    limit: number,
    currentPage: number,
    totalPages: number,
  ) {
    super({
      items: items.map(company => {
        return CompanyMap.DomainToDto(company);
      }),
      limit,
      currentPage,
      totalPages,
    });
  }
}
