import { Injectable, Inject, Logger } from '@nestjs/common';
import { Either, Result, left, right } from 'src/shared/core/Result';
import { CompanyErrors } from '../../../domain/errors/company.error';
import { Company } from '../../../domain/entities/company.entity';
import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { CreateCompanyDto } from '../../dtos/create-company.dto';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { CompanyName } from '../../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../../domain/value-objects/code.value-object';
import { AppError } from 'src/shared/core/errors/AppError';
import { EventPublisher } from '@nestjs/cqrs';

export type CreateCompanyResponse = Either<
  | CompanyErrors.CodeExistError
  | CompanyErrors.NameExistError
  | AppError.ValidationError<CompanyName | CompanyCode>
  | AppError.UnexpectedError,
  Result<void>
>;

@Injectable()
export class CreateCompanyUseCase
  implements IUseCase<CreateCompanyDto, Promise<CreateCompanyResponse>> {
  constructor(
    @Inject('ICompanyRepository')
    private readonly _companyRepository: ICompanyRepository,
    private readonly _publisher: EventPublisher,
  ) {}

  async execute(request: CreateCompanyDto): Promise<CreateCompanyResponse> {
    Logger.log('Executing...', 'CreateCompanyUseCase');
    const nameOrErr: Result<CompanyName> = CompanyName.create({
      value: request.name,
    });
    const codeOrErr: Result<CompanyCode> = CompanyCode.create({
      value: request.code,
    });
    const dtoResult = Result.combine([nameOrErr, codeOrErr]);
    if (dtoResult.isFailure) {
      return left(dtoResult);
    }
    const companyOrErr: Result<Company> = Company.new({
      name: nameOrErr.getValue(),
      code: codeOrErr.getValue(),
    });

    if (companyOrErr.isFailure) {
      return left(companyOrErr);
    }

    const company: Company = this._publisher.mergeObjectContext(
      companyOrErr.getValue(),
    );

    try {
      const codeExist: boolean = await this._companyRepository.existCompanyWithCode(
        company.code.value,
      );
      if (codeExist) {
        return left(new CompanyErrors.CodeExistError(company.code.value));
      }

      const nameExist: boolean = await this._companyRepository.existCompanyWithName(
        company.name.value,
      );
      if (nameExist) {
        return left(new CompanyErrors.NameExistError(company.name.value));
      }
      await this._companyRepository.create(company);
      company.commit();
      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
