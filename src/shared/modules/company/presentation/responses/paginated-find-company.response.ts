import { createUnionType } from '@nestjs/graphql';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { PaginatedFindCompanyResult } from './paginated-find-company.result';

export const PaginatedFindCompanyResponse = createUnionType({
  name: 'PaginatedFindCompanyResponse',
  types: () => [PaginatedFindCompanyResult, ValidationError, UnexpectedError],
});
