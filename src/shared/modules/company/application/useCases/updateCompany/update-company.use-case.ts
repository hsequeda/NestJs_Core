import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { UpdateCompanyDto } from '../../dtos/update-company.dto';
import { Result, Either, left, right } from 'src/shared/core/Result';
import { AppError } from 'src/shared/core/errors/AppError';
import { Inject, Logger } from '@nestjs/common';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { EventPublisher } from '@nestjs/cqrs';
import { CompanyErrors } from '../../../domain/errors/company.error';

import { has } from 'lodash';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyName } from '../../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../../domain/value-objects/code.value-object';
import { Version } from 'src/shared/domain/version.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';

export type UpdateCompanyUseCaseResp = Either<
  | CompanyErrors.CodeExistError
  | CompanyErrors.NameExistError
  | CompanyErrors.CompanyHasBeenDeleted
  | CompanyErrors.CompanyDoesntExist
  | AppError.ValidationError<CompanyCode | CompanyName>
  | AppError.UnexpectedError,
  Result<Company>
>;

export class UpdateCompanyUseCase
  implements IUseCase<UpdateCompanyDto, Promise<UpdateCompanyUseCaseResp>> {
  private _logger: Logger;
  constructor(
    @Inject('ICompanyRepository')
    private readonly _companyRepository: ICompanyRepository,
    private readonly _publisher: EventPublisher,
  ) {
    this._logger = new Logger('UpdateCompanyUseCase');
  }

  async execute(request: UpdateCompanyDto): Promise<UpdateCompanyUseCaseResp> {
    this._logger.log('Executing...');
    const id = new UniqueEntityID(request.id);
    let company: Company;
    try {
      const companyOrNone = await this._companyRepository.findOneById(id, true);

      const companyOrErr: Result<Company> = companyOrNone.match({
        some: (company: Company) => {
          return Result.ok(this._publisher.mergeObjectContext(company));
        },
        none: () => {
          return new CompanyErrors.CompanyDoesntExist(id);
        },
      });
      if (companyOrErr.isFailure) return left(companyOrErr);
      company = companyOrErr.getValue();
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    if (has(request, 'name')) {
      const nameOrErr = CompanyName.create({ value: request.name });

      if (nameOrErr.isFailure) {
        return left(nameOrErr);
      }

      const voidOrErr = company.changeName(nameOrErr.getValue());
      if (voidOrErr.isLeft()) return left(voidOrErr.value);
    }

    if (has(request, 'code')) {
      const codeOrErr = CompanyCode.create({ value: request.code });

      if (codeOrErr.isFailure) return left(codeOrErr);

      const voidOrErr = company.changeCode(codeOrErr.getValue());
      if (voidOrErr.isLeft()) return left(voidOrErr.value);
    }
    const versionOrErr = Version.create({ value: request.currentVersion });
    if (versionOrErr.isFailure) return left(versionOrErr);

    const version = versionOrErr.getValue();
    try {
      await this._companyRepository.update(company, version);
      company.commit();
      return right(Result.ok(company));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
