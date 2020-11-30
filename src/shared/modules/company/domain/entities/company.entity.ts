import { DomainEntity } from 'src/shared/domain/entity.abstract';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { IGuardArgument } from 'src/shared/core/interfaces/IGuardArgument';
import { Guard } from 'src/shared/core/Guard';
import { Result } from 'src/shared/core/Result';
import { Code } from '../value-objects/code.value-object';
import { Name } from '../value-objects/name.value-object';

interface CompanyProps {
  code: Code;
  name: Name;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Company extends DomainEntity<CompanyProps> {
  get id(): string {
    return this.id.toString();
  }

  get code(): Code {
    return this.props.code;
  }

  get name(): Name {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.updatedAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  changeName(newName: Name): void {
    this.props.name = newName;
    this.props.updatedAt = new Date();
  }

  changeCode(newCode: Code): void {
    this.props.code = newCode;
    this.props.updatedAt = new Date();
  }

  public static create(
    props: CompanyProps,
    id?: UniqueEntityID,
  ): Result<Company> {
    const args: IGuardArgument[] = [
      { argument: props.code, argumentPath: 'code' },
      { argument: props.name, argumentPath: 'name' },
    ];
    const nullGuard = Guard.againstNullOrUndefinedBulk(args);
    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Company(props, id));
  }
}
