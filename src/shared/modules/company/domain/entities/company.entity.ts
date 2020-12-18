import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { IGuardArgument } from 'src/shared/core/interfaces/IGuardArgument';
import { Guard } from 'src/shared/core/Guard';
import { Result } from 'src/shared/core/Result';
import { CompanyCode } from '../value-objects/code.value-object';
import { CompanyName } from '../value-objects/name.value-object';
import { isNil } from 'lodash';
import { Version } from 'src/shared/domain/version.value-object';
import { AggregateDomainEntity } from 'src/shared/domain/aggregate-entity.abstract';
import { CreatedCompanyEvent } from '../events/create-company.event';
import { UpdatedCompanyEvent } from '../events/updated-company.event';
import { DeletedCompanyEvent } from '../events/deleted-company.event';

interface CompanyProps {
  code: CompanyCode;
  name: CompanyName;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version?: Version;
}

export class Company extends AggregateDomainEntity<CompanyProps> {
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

  get isActive(): boolean {
    return this.props.deletedAt === undefined;
  }

  get version(): Version {
    return this.props.version;
  }

  changeName(newName: CompanyName): Result<void> {
    if (!this.isActive) {
      return Result.fail(new Error('This Company has been deleted')); // TODO
    }
    this.props.name = newName;
    this.increaseVersion();
    this.props.updatedAt = new Date();
    this.apply(
      new UpdatedCompanyEvent(this._id.toString(), this.version.value),
    );
    return Result.ok();
  }

  changeCode(newCode: CompanyCode): Result<void> {
    if (!this.isActive) {
      return Result.fail(new Error('This Company has been deleted')); // TODO
    }
    this.props.code = newCode;
    this.increaseVersion();
    this.props.updatedAt = new Date();
    this.apply(
      new UpdatedCompanyEvent(this._id.toString(), this.version.value),
    );
    return Result.ok();
  }

  markHasDeleted(): Result<void> {
    if (this.isActive) {
      return Result.fail(new Error('This Company has been deleted')); // TODO
    }

    this.props.updatedAt = new Date();
    this.props.deletedAt = new Date();
    this.apply(
      new DeletedCompanyEvent(this._id.toString(), this.version.value),
    );
    return Result.ok();
  }

  private increaseVersion(): void {
    this.props.version = Version.create({
      value: this.version.value + 1,
    }).getValue();
  }

  public static new(props: CompanyProps): Result<Company> {
    const id = new UniqueEntityID();
    const companyOrErr: Result<Company> = this.create(props, id);
    if (companyOrErr.isFailure) return Result.fail(companyOrErr.errorValue());
    const company: Company = companyOrErr.getValue();
    company.apply(new CreatedCompanyEvent(id.toString()));
    return Result.ok(company);
  }

  public static create(
    props: CompanyProps,
    id: UniqueEntityID,
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
    if (isNil(props.version))
      props.version = Version.create({ value: 1 }).getValue();
    return Result.ok(new Company(props, id));
  }
}
