import { UseCaseError } from 'src/shared/core/errors/UseCaseError';
import { Result } from 'src/shared/core/Result';

export namespace CompanyErrors {
  export class CompanyHasBeenDeleted extends Result<UseCaseError> {
    constructor(deletedAt: Date) {
      super(false, { message: `Company has been deleted in ${deletedAt}` });
    }
  }

  export class CompanyDoesntExist extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, { message: `Doesn't exist company with id ${id}` });
    }
  }
  export class CodeExistError extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, { message: `User with name '${name}' already exist` });
    }
  }

  export class NameExistError extends Result<UseCaseError> {
    constructor(code: string) {
      super(false, { message: `User with code '${code}' already exist` });
    }
  }
}
