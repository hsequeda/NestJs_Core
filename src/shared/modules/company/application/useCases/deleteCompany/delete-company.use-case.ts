import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { Inject, Logger } from '@nestjs/common';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { EventPublisher } from '@nestjs/cqrs';
import { DeleteCompanyDto } from '../../dtos/delete-company.dto';
import { left, Result, Either, right } from 'src/shared/core/Result';
import { Company } from '../../../domain/entities/company.entity';
import { AppError } from 'src/shared/core/errors/AppError';
import { CompanyErrors } from '../../../domain/errors/company.error';
import { Version } from 'src/shared/domain/version.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';

export type DeleteCompanyUseCaseResp = Either<
  | CompanyErrors.CompanyDoesntExist
  | CompanyErrors.CompanyHasBeenDeleted
  | AppError.ValidationError<Version>
  | AppError.UnexpectedError,
  Result<void>
>;

export class DeleteCompanyUseCase
  implements IUseCase<DeleteCompanyDto, DeleteCompanyUseCaseResp> {
  private _logger: Logger;
  constructor(
    @Inject('ICompanyRepository')
    private readonly _companyRepository: ICompanyRepository,
    private readonly _publisher: EventPublisher,
  ) {
    this._logger = new Logger('DeleteCompanyUseCase');
  }

  async execute(request: DeleteCompanyDto): Promise<DeleteCompanyUseCaseResp> {
    this._logger.log('Executing...');
    const id = new UniqueEntityID(request.id);
    const versionOrErr = Version.create({ value: request.currentVersion });
    if (versionOrErr.isFailure) {
      return left(versionOrErr);
    }

    const version: Version = versionOrErr.getValue();
    try {
      const companyOrNone = await this._companyRepository.findOneById(id, true);
      let company: Company;

      const companyOrErr: Result<Company> = companyOrNone.match({
        some: (company: Company) => {
          return Result.ok(this._publisher.mergeObjectContext(company));
        },
        none: () => {
          return new CompanyErrors.CompanyDoesntExist(id);
        },
      });

      if (companyOrErr.isFailure) {
        return left(companyOrErr);
      }

      company = companyOrErr.getValue();
      const voidOrErr = company.markHasDeleted();
      if (voidOrErr.isLeft()) return left(voidOrErr.value);

      await this._companyRepository.delete(id, version);
      company.commit();
      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
