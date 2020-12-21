import { createUnionType } from '@nestjs/graphql';
import { CodeExistError } from './code-exist.error';
import { NameExistError } from './name-exist.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { SuccessResponse } from 'src/shared/core/presentation/responses/success.response';

export const CreateCompanyResponse = createUnionType({
  name: 'CreateCompanyResponse',
  types: () => [
    SuccessResponse,
    NameExistError,
    CodeExistError,
    ValidationError,
    UnexpectedError,
  ],
});
