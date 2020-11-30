import { ValueObject } from 'src/shared/domain/value-object.abstract';
import { Result } from 'src/shared/core/Result';
import { Guard } from 'src/shared/core/Guard';

interface CodeProps {
  value: string;
}

export class Code extends ValueObject<CodeProps> {
  static maxLength = 4;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: CodeProps) {
    super(props);
  }

  public static create(props: CodeProps): Result<Code> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'code');
    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'code',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    return Result.ok(new Code(props));
  }
}
