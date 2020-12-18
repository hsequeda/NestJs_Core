import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { Inject } from '@nestjs/common';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { EventPublisher } from '@nestjs/cqrs';
import { DeleteCompanyDto } from '../../dtos/delete-company.dto';
import { left, Result, Either, right } from 'src/shared/core/Result';
import { Company } from '../../../domain/entities/company.entity';
import { AppError } from 'src/shared/core/errors/AppError';
import { CompanyErrors } from '../../../domain/errors/company.error';

type Response = Either<AppError.UnexpectedError, Result<void>>;

export class DeleteCompanyUseCase
  implements IUseCase<DeleteCompanyDto, Response> {
  constructor(
    @Inject() private readonly _companyRepository: ICompanyRepository,
    @Inject() private readonly _publisher: EventPublisher,
  ) {}

  async execute(request: DeleteCompanyDto): Promise<Response> {
    const existCompanyWithId = await this._companyRepository.existCompanyWithId(
      request.id,
    );
    if (!existCompanyWithId) {
      // return left(
      //   Result.fail(new CompanyErrors.CompanyDoesntExist(request.id)),
      // );
    }

    try {
      const company: Company = this._publisher.mergeObjectContext(
        await this._companyRepository.findOneById(request.id),
      );
      company.markHasDeleted();
      // await this._companyRepository.save(company);
      company.commit();
      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
