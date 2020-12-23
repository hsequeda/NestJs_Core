import { createUnionType } from '@nestjs/graphql';
import { CompanyCodeExistError } from './code-exist.error';
import { CompanyNameExistError } from './name-exist.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { CompanySuccess } from './company-success.response';

export const CreateCompanyResponse = createUnionType({
  name: 'CreateCompanyResponse',
  types: () => [
    CompanySuccess,
    CompanyNameExistError,
    CompanyCodeExistError,
    ValidationError,
    UnexpectedError,
  ],
});
