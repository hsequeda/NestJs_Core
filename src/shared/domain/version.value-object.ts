import { ValueObject } from './value-object.abstract';
import { Guard } from '../core/Guard';
import { Result } from '../core/Result';

interface VersionProps {
  value: number;
}

export class Version extends ValueObject<VersionProps> {
  static minValue = 0;

  get value(): number {
    return this.props.value;
  }
  public static create(props: VersionProps): Result<Version> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'version',
    );
    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }
    const greatherThanResult = Guard.greaterThan(
      this.minValue,
      props.value,
      'version',
    );
    if (!greatherThanResult.succeeded) {
      return Result.fail(greatherThanResult);
    }
    return Result.ok(new Version(props));
  }
}
