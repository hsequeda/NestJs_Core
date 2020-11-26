export abstract class UseCaseError implements IUseCaseError {
  constructor(public readonly message: string) {
    this.message = message;
  }
}
