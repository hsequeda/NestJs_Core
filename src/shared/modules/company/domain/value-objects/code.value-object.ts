import { ValueObject } from 'src/shared/domain/value-object.abstract';
import { Result } from 'src/shared/core/Result';
import { Guard } from 'src/shared/core/Guard';

interface CompanyCodeProps {
  value: string;
}

export class CompanyCode extends ValueObject<CompanyCodeProps> {
  static minLength = 1;
  static maxLength = 4;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: CompanyCodeProps) {
    super(props);
  }

  public static create(props: CompanyCodeProps): Result<CompanyCode> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'code');
    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'code',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'code',
    });

    if (!maxGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    return Result.ok(new CompanyCode(props));
  }
}
