import { IResultError } from './interfaces/IResultError';

export class Result<R, E = IResultError> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: E;
  private _value: R;

  protected constructor(isSuccess: boolean, error?: E, value?: R) {
    if (isSuccess && error) {
      throw new Error(
        `InvalidOperation: A result cannot be succesful and contain an error`,
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        `InvalidOperation: A failing result needs to contain an error message`,
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): R {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }

  public errorValue(): E {
    return this.error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(
    error: IResultError = { message: 'Unexpected error occurred' },
  ): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
