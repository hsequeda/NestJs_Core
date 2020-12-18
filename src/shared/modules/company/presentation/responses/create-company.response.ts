import { createUnionType } from '@nestjs/graphql';
import { CodeExistError } from './code-exist.error';
import { NameExistError } from './name-exist.error';

export const CreateCompanyResponse = createUnionType({
  name: 'CreateCompanyResponse',
  types: () => [Boolean, NameExistError, CodeExistError],
});
