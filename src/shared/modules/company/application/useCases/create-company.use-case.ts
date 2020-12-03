import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from '../../domain/interfaces/IRepository';
import { ICreateCompanyDto } from '../dtos/create-company.dto';
import { Company } from '../../domain/entities/company.entity';
import { CompanyName } from '../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../domain/value-objects/code.value-object';
import { Result, left, right, Either } from 'src/shared/core/Result';
import { AppError } from 'src/shared/core/errors/AppError';
import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { CompanyErrors } from '../../domain/errors/company.error';

type Response = Either<
  | CompanyErrors.CodeExistError
  | CompanyErrors.NameExistError
  | AppError.ValidationError
  | AppError.UnexpectedError,
  Result<Company>
>;

@Injectable()
export class CreateCompanyUseCase
  implements IUseCase<ICreateCompanyDto, Promise<Response>> {
  constructor(
    @Inject() private readonly _companyRepository: ICompanyRepository,
  ) {}

  async execute(request: ICreateCompanyDto): Promise<Response> {
    const nameOrErr: Result<CompanyName> = CompanyName.create({
      value: request.name,
    });
    const codeOrErr: Result<CompanyCode> = CompanyCode.create({
      value: request.code,
    });
    const dtoResult = Result.combine([nameOrErr, codeOrErr]);
    if (dtoResult.isFailure) {
      return left(Result.fail(dtoResult.errorValue()));
    }
    const companyOrErr: Result<Company> = Company.create({
      name: nameOrErr.getValue(),
      code: codeOrErr.getValue(),
    });

    if (companyOrErr.isFailure) {
      return left(Result.fail(companyOrErr.errorValue()));
    }
    const company: Company = companyOrErr.getValue();
    try {
      const codeExist: boolean = await this._companyRepository.existCompany({
        code: { is: company.code.value },
      });
      if (!codeExist) {
        return left(new CompanyErrors.CodeExistError(company.code.value));
      }
      const nameExist: boolean = await this._companyRepository.existCompany({
        name: { is: company.name.value },
      });
      if (!nameExist) {
        return left(new CompanyErrors.NameExistError(company.name.value));
      }
      await this._companyRepository.save(company);
      return right(Result.ok(company));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
