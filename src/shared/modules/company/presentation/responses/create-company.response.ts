import { createUnionType } from '@nestjs/graphql';
import { CompanyCodeExistError } from './code-exist.error';
import { CompanyNameExistError } from './name-exist.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { SuccessResponse } from 'src/shared/core/presentation/responses/success.response';

export const CreateCompanyResponse = createUnionType({
  name: 'CreateCompanyResponse',
  types: () => [
    SuccessResponse,
    CompanyNameExistError,
    CompanyCodeExistError,
    ValidationError,
    UnexpectedError,
  ],
});
