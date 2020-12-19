import { UseCaseError } from 'src/shared/core/errors/UseCaseError';
import { Result } from 'src/shared/core/Result';
import { Logger } from '@nestjs/common';

export namespace CompanyErrors {
  export class CompanyHasBeenDeleted extends Result<UseCaseError> {
    constructor() {
      super(false, { message: 'Company has been deleted' });
      Logger.log('Error: Company has been deleted', 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }

  export class CompanyDoesntExist extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, { message: `Doesn't exist company with id ${id}` });
      Logger.log(`Error: Company doesn't exist`, 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }
  export class CodeExistError extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, { message: `User with name '${name}' already exist` });
      Logger.log('Error: Code exist error', 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }

  export class NameExistError extends Result<UseCaseError> {
    constructor(code: string) {
      super(false, { message: `User with code '${code}' already exist` });
      Logger.log('Error: Name exist error', 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }
}
