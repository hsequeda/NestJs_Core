import { Result } from 'src/shared/core/Result';
import { Logger } from '@nestjs/common';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { CompanyCode } from '../value-objects/code.value-object';
import { CompanyName } from '../value-objects/name.value-object';

export namespace CompanyErrors {
  export class CompanyHasBeenDeleted extends Result<any> {
    constructor() {
      super(false, { message: 'Company has been deleted' });
      Logger.log('Error: Company has been deleted', 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }

  export class CompanyDoesntExist extends Result<any> {
    constructor(id: UniqueEntityID) {
      super(false, {
        message: `Doesn't exist company with id ${id.toString()}`,
      });
      Logger.log(`Error: Company doesn't exist`, 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }
  export class CodeExistError extends Result<any> {
    constructor(code: CompanyCode) {
      super(false, { message: `User with code '${code.value}' already exist` });
      Logger.log('Error: Code exist error', 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }

  export class NameExistError extends Result<any> {
    constructor(name: CompanyName) {
      super(false, { message: `User with name '${name.value}' already exist` });
      Logger.log('Error: Name exist error', 'CompanyError');
      Logger.error(this.errorValue().message);
    }
  }
}
