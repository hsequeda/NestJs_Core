import { DomainEntity } from 'src/shared/domain/entity.abstract';
import { IOrientation } from './interfaces/IOrientation';
import { Code } from './code.value-object';
import { Description } from './description.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { Result } from 'src/shared/core/Result';
import { IGuardArgument } from 'src/shared/core/interfaces/IGuardArgument';
import { Guard } from 'src/shared/core/Guard';

interface OrientationProps {
  code: Code;
  description: Description;
}

export class Orientation extends DomainEntity<OrientationProps>
  implements IOrientation {
  get code(): string {
    return this.props.code.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  changeCode(newCode: Code) {
    this.props.code = newCode;
  }

  changeDescription(newDescription: Description) {
    this.props.description = newDescription;
  }

  public static create(
    props: OrientationProps,
    id: UniqueEntityID,
  ): Result<IOrientation> {
    const args: IGuardArgument[] = [
      { argument: props.code, argumentPath: 'code' },
      { argument: props.description, argumentPath: 'description' },
    ];

    const nullGuard = Guard.againstNullOrUndefinedBulk(args);
    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Orientation(props, id));
  }
}
