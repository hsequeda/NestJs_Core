import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { Either, Result, left, right } from 'src/shared/core/Result';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyErrors } from '../../../domain/errors/company.error';
import { FindOneCompanyDto } from '../../dtos/find-one-company.dto';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { AppError } from 'src/shared/core/errors/AppError';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import Optional from 'src/shared/core/Option';

export type FindOneCompanyUseCaseResp = Either<
  CompanyErrors.CompanyDoesntExist | AppError.UnexpectedError,
  Result<Company>
>;

@Injectable()
export class FindOneCompanyUseCase
  implements IUseCase<FindOneCompanyDto, FindOneCompanyUseCaseResp> {
  private _logger: Logger;
  constructor(
    @Inject('ICompanyRepository')
    private readonly _companyRepository: ICompanyRepository,
  ) {
    this._logger = new Logger('FindOneCompanyUseCase');
  }
  async execute(
    request: FindOneCompanyDto,
  ): Promise<FindOneCompanyUseCaseResp> {
    this._logger.log('Executing...');
    try {
      const company: Optional<Company> = await this._companyRepository.findOneById(
        new UniqueEntityID(request.id),
      );
      return company.match({
        some: company => {
          return right(Result.ok(company));
        },
        none: () => {
          return left(
            new CompanyErrors.CompanyDoesntExist(
              new UniqueEntityID(request.id),
            ),
          );
        },
      });
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
