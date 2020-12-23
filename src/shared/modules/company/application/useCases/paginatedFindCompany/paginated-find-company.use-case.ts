import { Result, Either, left, right } from 'src/shared/core/Result';
import { AppError } from 'src/shared/core/errors/AppError';
import { Company } from '../../../domain/entities/company.entity';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { PageParams } from 'src/shared/core/PaginatorParams';
import { PaginatedFindCompanyDto } from '../../dtos/paginated-find-company.dto';
import { PaginatedFindResult } from 'src/shared/core/PaginatedFindResult';
export type PaginatedFindCompanyUseCaseResp = Either<
  AppError.ValidationError<PageParams> | AppError.UnexpectedError,
  Result<PaginatedFindResult<Company>>
>;

@Injectable()
export class PaginatedFindCompanyUseCase
  implements
    IUseCase<PaginatedFindCompanyDto, PaginatedFindCompanyUseCaseResp> {
  private _logger: Logger;
  constructor(
    @Inject('ICompanyRepository')
    private readonly _companyRepository: ICompanyRepository,
  ) {
    this._logger = new Logger('PaginatedCompanyUseCase');
  }
  async execute(
    request: PaginatedFindCompanyDto,
  ): Promise<PaginatedFindCompanyUseCaseResp> {
    this._logger.log('Executing...');
    const pageParamsOrErr = PageParams.create(request.pageParams);
    if (pageParamsOrErr.isFailure) {
      return left(pageParamsOrErr);
    }
    const pageParams = pageParamsOrErr.getValue();
    try {
      const paginatedCompanies = await this._companyRepository.paginatedFindCompany(
        pageParams,
        request.where,
        request.order,
      );
      return right(Result.ok(paginatedCompanies));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
