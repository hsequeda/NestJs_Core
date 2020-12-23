import { createUnionType } from '@nestjs/graphql';
import { SuccessResponse } from 'src/shared/core/presentation/responses/success.response';
import { CompanyDoesntExistError } from './company-doesnt-exist.error';
import { CompanyHasBeenDeletedError } from './company-has-been-deleted.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { CompanyNameExistError } from './name-exist.error';
import { CompanyCodeExistError } from './code-exist.error';

export const UpdateCompanyResponse = createUnionType({
  name: 'UpdateCompanyResponse',
  types: () => [
    SuccessResponse,
    CompanyNameExistError,
    CompanyCodeExistError,
    CompanyDoesntExistError,
    CompanyHasBeenDeletedError,
    ValidationError,
    UnexpectedError,
  ],
});
