import { IUseCase } from 'src/shared/core/interfaces/IUseCase';
import { UpdateCompanyDto } from '../../dtos/update-company.dto';
import { Result, Either, left, right } from 'src/shared/core/Result';
import { AppError } from 'src/shared/core/errors/AppError';
import { Inject } from '@nestjs/common';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { EventPublisher } from '@nestjs/cqrs';
import { CompanyErrors } from '../../../domain/errors/company.error';

import { has } from 'lodash';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyName } from '../../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../../domain/value-objects/code.value-object';
import { Version } from 'src/shared/domain/version.value-object';

type Response = Either<
  | CompanyErrors.CodeExistError
  | CompanyErrors.NameExistError
  | CompanyErrors.CompanyDoesntExist
  | AppError.ValidationError<CompanyCode | CompanyName>
  | AppError.UnexpectedError,
  Result<void>
>;

export class UpdateCompanyUseCase
  implements IUseCase<UpdateCompanyDto, Promise<Response>> {
  constructor(
    @Inject() private readonly _companyRepository: ICompanyRepository,
    @Inject() private readonly _publisher: EventPublisher,
  ) {}

  async execute(request: UpdateCompanyDto): Promise<Response> {
    const existCompanyWithId = await this._companyRepository.existCompanyWithId(
      request.id,
    );
    if (!existCompanyWithId)
      return left(new CompanyErrors.CompanyDoesntExist(request.id));

    let company: Company;
    let initialVersion: Version;
    try {
      company = this._publisher.mergeObjectContext(
        await this._companyRepository.findOneById(request.id),
      );
      initialVersion = company.version;
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    if (has(request, 'name')) {
      const nameOrErr = CompanyName.create({ value: request.name });

      if (nameOrErr.isFailure) {
        return left(nameOrErr.errorValue());
      }
      company.changeName(nameOrErr.getValue());
    }

    if (has(request, 'code')) {
      const codeOrErr = CompanyCode.create({ value: request.code });

      if (codeOrErr.isFailure) {
        return left(codeOrErr.errorValue());
      }
      company.changeCode(codeOrErr.getValue());
    }

    try {
      if (!company.version.equals(initialVersion)) {
        // await this._companyRepository.save(company);
        company.commit();
      }
      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
