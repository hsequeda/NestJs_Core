import { ValueObject } from 'src/shared/domain/value-object.abstract';
import { Result } from 'src/shared/core/Result';
import { Guard } from 'src/shared/core/Guard';
import { AppError } from 'src/shared/core/errors/AppError';

interface CompanyCodeProps {
  value: string;
}

export class CompanyCode extends ValueObject<CompanyCodeProps> {
  static minLength = 1;
  static maxLength = 4;
  private readonly _brand?: CompanyCode;

  get value(): string {
    return this.props.value;
  }

  public static create(props: CompanyCodeProps): Result<CompanyCode> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'code');
    if (!nullGuardResult.succeeded) {
      return new AppError.ValidationError({ message: nullGuardResult.message });
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'code',
    });

    if (!minGuardResult.succeeded) {
      return new AppError.ValidationError({ message: minGuardResult.message });
    }

    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'code',
    });

    if (!maxGuardResult.succeeded) {
      return new AppError.ValidationError({ message: maxGuardResult.message });
    }

    return Result.ok(new CompanyCode(props));
  }
}
