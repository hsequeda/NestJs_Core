import { ValueObject } from 'src/shared/domain/value-object.abstract';
import { Result } from 'src/shared/core/Result';
import { Guard } from 'src/shared/core/Guard';
import { IGuardResult } from 'src/shared/core/interfaces/IGuardResult';
import { AppError } from 'src/shared/core/errors/AppError';

interface CompanyNameProps {
  value: string;
}

export class CompanyName extends ValueObject<CompanyNameProps> {
  static minLength = 1;
  static maxLength = 20;
  private readonly _brand?: CompanyNameProps;

  get value(): string {
    return this.props.value;
  }

  public static create(props: CompanyNameProps): Result<CompanyName> {
    const nullGuardResult: IGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'name',
    );
    if (!nullGuardResult.succeeded) {
      return new AppError.ValidationError({ message: nullGuardResult.message });
    }

    const minGuardResult: IGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'name',
    });

    if (!minGuardResult.succeeded) {
      return new AppError.ValidationError({ message: minGuardResult.message });
    }

    const maxGuardResult: IGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'name',
    });

    if (!maxGuardResult.succeeded) {
      return new AppError.ValidationError({ message: maxGuardResult.message });
    }

    return Result.ok(new CompanyName(props));
  }
}
