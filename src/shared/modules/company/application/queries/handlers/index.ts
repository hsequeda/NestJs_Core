import { FindOneCompanyHandler } from './find-one-company.handler';
import { PaginatedFindCompanyHandler } from './paginated-find-company.handler';

export const QueryHandlers = [
  FindOneCompanyHandler,
  PaginatedFindCompanyHandler,
];
