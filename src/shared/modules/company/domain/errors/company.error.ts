import { IGuardResult } from 'src/shared/core/interfaces/IGuardResult';

export namespace CompanyErrors {
  export class CodeExistError implements IGuardResult {
    succeeded: boolean;
    message: string;

    constructor(name: string) {
      this.succeeded = false;
      this.message = `User with name ${name} already exist`;
    }
  }

  export class NameExistError implements IGuardResult {
    succeeded: boolean;
    message: string;

    constructor(code: string) {
      this.succeeded = false;
      this.message = `User with code ${code} already exist`;
    }
  }
}
