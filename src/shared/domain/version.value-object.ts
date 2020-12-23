import { ValueObject } from './value-object.abstract';
import { Guard } from '../core/Guard';
import { Result } from '../core/Result';
import { AppError } from '../core/errors/AppError';

interface VersionProps {
  value: number;
}

export class Version extends ValueObject<VersionProps> {
  static minValue = 0;
  private readonly _brand?: Version;

  get value(): number {
    return this.props.value;
  }
  public static create(props: VersionProps): Result<Version> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'version',
    );
    if (!nullGuardResult.succeeded) {
      return new AppError.ValidationError({
        message: nullGuardResult.message,
      });
    }
    const greatherThanResult = Guard.greaterThan(
      this.minValue,
      props.value,
      'version',
    );
    if (!greatherThanResult.succeeded) {
      return new AppError.ValidationError({
        message: greatherThanResult.message,
      });
    }
    return Result.ok(new Version(props));
  }
}
