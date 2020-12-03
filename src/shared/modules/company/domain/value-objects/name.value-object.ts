import { ValueObject } from 'src/shared/domain/value-object.abstract';
import { Result } from 'src/shared/core/Result';
import { Guard } from 'src/shared/core/Guard';
import { IGuardResult } from 'src/shared/core/interfaces/IGuardResult';

interface CompanyNameProps {
  value: string;
}

export class CompanyName extends ValueObject<CompanyNameProps> {
  static minLength = 1;
  static maxLength = 20;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: CompanyNameProps) {
    super(props);
  }

  public static create(props: CompanyNameProps): Result<CompanyName> {
    const nullGuardResult: IGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'name',
    );
    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult: IGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'name',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    const maxGuardResult: IGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'name',
    });

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult);
    }

    return Result.ok(new CompanyName(props));
  }
}
