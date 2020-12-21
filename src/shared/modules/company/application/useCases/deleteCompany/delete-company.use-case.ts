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
    try {
      const existCompanyWithId = await this._companyRepository.existCompanyWithId(
        request.id,
      );
      if (!existCompanyWithId) {
        return left(new CompanyErrors.CompanyDoesntExist(request.id));
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    const versionOrErr = Version.create({ value: request.currentVersion });
    if (versionOrErr.isFailure) {
      return left(versionOrErr);
    }

    const version: Version = versionOrErr.getValue();
    try {
      const company: Company = this._publisher.mergeObjectContext(
        await this._companyRepository.findOneById(request.id),
      );

      const voidOrErr = company.markHasDeleted();
      if (voidOrErr.isLeft()) return left(voidOrErr.value);

      await this._companyRepository.delete(request.id, version);
      company.commit();
      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
