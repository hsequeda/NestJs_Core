import { createUnionType } from '@nestjs/graphql';
import { CodeExistError } from './code-exist.error';
import { NameExistError } from './name-exist.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';

export const CreateCompanyResponse = createUnionType({
  name: 'CreateCompanyResponse',
  types: () => [
    Boolean,
    NameExistError,
    CodeExistError,
    ValidationError,
    UnexpectedError,
  ],
});
