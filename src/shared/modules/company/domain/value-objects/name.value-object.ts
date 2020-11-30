import { ValueObject } from 'src/shared/domain/value-object.abstract';
import { Result } from 'src/shared/core/Result';
import { Guard } from 'src/shared/core/Guard';
import { IGuardResult } from 'src/shared/core/interfaces/IGuardResult';

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  static maxLength = 20;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: NameProps) {
    super(props);
  }

  public static create(props: NameProps): Result<Name> {
    const nullGuardResult: IGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'name',
    );
    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult: IGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'name',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    return Result.ok(new Name(props));
  }
}
