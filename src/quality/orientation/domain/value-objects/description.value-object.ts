import { ValueObject } from 'src/shared/domain/value-object.abstract';
import { Guard } from 'src/shared/core/Guard';
import { Result } from 'src/shared/core/Result';

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  static maxLength = 40;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: DescriptionProps) {
    super(props);
  }
  public static create(props: DescriptionProps): Result<Description> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'description',
    );
    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'description',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    return Result.ok(new Description(props));
  }
}
