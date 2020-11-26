import { Result } from '../Result';
import { UnknownError } from './UnknownError';
import { Logger } from '@nestjs/common';
import { IResultError } from '../interfaces/IResultError';

/**
 * @desc General application errors (few of these as possible)
 * @http 500
 */
export namespace AppError {
  export class UnexpectedError extends Result<UnknownError> {
    public constructor(err: unknown) {
      super(false, {
        message: 'unexpectedServerError',
        error: err,
      });
      Logger.log('[AppError]: An unexpected error occurred');
      Logger.error(err);
    }

    public static create(err: unknown): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class ValidationError extends Result<IResultError> {
    constructor({ message, error }: IResultError) {
      super(false, { message, error });
    }
  }
}
