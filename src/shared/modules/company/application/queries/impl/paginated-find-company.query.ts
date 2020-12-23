import { PaginatedFindCompanyDto } from '../../dtos/paginated-find-company.dto';

export class PaginatedFindCompanyQuery {
  constructor(public readonly input: PaginatedFindCompanyDto) {}
}
