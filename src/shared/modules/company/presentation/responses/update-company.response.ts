import { createUnionType } from '@nestjs/graphql';
import { CompanyDoesntExistError } from './company-doesnt-exist.error';
import { CompanyHasBeenDeletedError } from './company-has-been-deleted.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { CompanyNameExistError } from './name-exist.error';
import { CompanyCodeExistError } from './code-exist.error';
import { CompanySuccess } from './company-success.response';

export const UpdateCompanyResponse = createUnionType({
  name: 'UpdateCompanyResponse',
  types: () => [
    CompanySuccess,
    CompanyNameExistError,
    CompanyCodeExistError,
    CompanyDoesntExistError,
    CompanyHasBeenDeletedError,
    ValidationError,
    UnexpectedError,
  ],
});
