import { createUnionType } from '@nestjs/graphql';
import { CompanyDoesntExistError } from './company-doesnt-exist.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { CompanyResp } from './company.resp';

export const FindOneCompanyResponse = createUnionType({
  name: 'FindOneCompanyResponse',
  types: () => [CompanyResp, CompanyDoesntExistError, UnexpectedError],
});
