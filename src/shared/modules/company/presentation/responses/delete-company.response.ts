import { createUnionType } from '@nestjs/graphql';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { CompanyDoesntExistError } from './company-doesnt-exist.error';
import { CompanyHasBeenDeletedError } from './company-has-been-deleted.error';
import { CompanySuccess } from './company-success.response';

export const DeleteCompanyResponse = createUnionType({
  name: 'DeleteCompanyResponse',
  types: () => [
    CompanySuccess,
    CompanyDoesntExistError,
    CompanyHasBeenDeletedError,
    ValidationError,
    UnexpectedError,
  ],
});
