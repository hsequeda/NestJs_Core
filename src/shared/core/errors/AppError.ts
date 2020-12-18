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
      Logger.log('An unexpected error occurred', 'AppError');
      Logger.error(err);
    }
  }

  export class ValidationError<R> extends Result<R> {
    constructor({ message, error }: IResultError) {
      super(false, { message, error });
      Logger.log('A validation error occurred', 'AppError');
      Logger.error(message);
    }
  }
}
