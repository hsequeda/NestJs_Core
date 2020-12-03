import { DomainEntity } from 'src/shared/domain/entity.abstract';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { IGuardArgument } from 'src/shared/core/interfaces/IGuardArgument';
import { Guard } from 'src/shared/core/Guard';
import { Result } from 'src/shared/core/Result';
import { CompanyCode } from '../value-objects/code.value-object';
import { CompanyName } from '../value-objects/name.value-object';
import { isNil } from 'lodash';

interface CompanyProps {
  code: CompanyCode;
  name: CompanyName;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Company extends DomainEntity<CompanyProps> {
  get id(): string {
    return this._id.toString();
  }

  get code(): CompanyCode {
    return this.props.code;
  }

  get name(): CompanyName {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.updatedAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  changeName(newName: CompanyName): void {
    this.props.name = newName;
    this.props.updatedAt = new Date();
  }

  changeCode(newCode: CompanyCode): void {
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
    if (isNil(props.createdAt)) props.createdAt = new Date();
    if (isNil(props.updatedAt)) props.updatedAt = new Date();
    return Result.ok(new Company(props, id));
  }
}
