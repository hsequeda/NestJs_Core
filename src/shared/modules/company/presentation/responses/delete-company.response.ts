import { createUnionType } from '@nestjs/graphql';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { CompanyDoesntExistError } from './company-doesnt-exist.error';
import { CompanyHasBeenDeletedError } from './company-has-been-deleted.error';
import { SuccessResponse } from 'src/shared/core/presentation/responses/success.response';

export const DeleteCompanyResponse = createUnionType({
  name: 'DeleteCompanyResponse',
  types: () => [
    SuccessResponse,
    CompanyDoesntExistError,
    CompanyHasBeenDeletedError,
    ValidationError,
    UnexpectedError,
  ],
});
