import { Company } from '../../domain/entities/company.entity';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyName } from '../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../domain/value-objects/code.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { Result } from 'src/shared/core/Result';
import { Version } from 'src/shared/domain/version.value-object';

export class CompanyMap {
  public static PersistentToDomain(persistentEntity: CompanyEntity): Company {
    const nameOrErr = CompanyName.create({ value: persistentEntity.name });
    const codeOrErr = CompanyCode.create({ value: persistentEntity.code });
    const versionOrErr = Version.create({ value: persistentEntity.version });
    const combineResults = Result.combine([nameOrErr, codeOrErr, versionOrErr]);
    if (combineResults.isFailure) {
      throw new Error(combineResults.errorValue().message);
    }

    const id = new UniqueEntityID(persistentEntity.id);
    const companyOrErr = Company.create(
      {
        name: nameOrErr.getValue(),
        code: codeOrErr.getValue(),
        createdAt: persistentEntity.createdAt,
        updatedAt: persistentEntity.updatedAt,
        deletedAt: persistentEntity.deletedAt,
        version: versionOrErr.getValue(),
      },
      id,
    );

    if (companyOrErr.isFailure) {
      throw new Error(companyOrErr.errorValue().message);
    }

    return companyOrErr.getValue();
  }

  public static DomainToPersitent(
    domainEntity: Company,
  ): Partial<CompanyEntity> {
    return {
      id: domainEntity._id.toString(),
      code: domainEntity.code.value,
      name: domainEntity.name.value,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
      deletedAt: domainEntity.isActive ? undefined : domainEntity.updatedAt,
      version: domainEntity.version.value,
    };
  }
}
