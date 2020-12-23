import { MockType } from 'src/shared/core/interfaces/MockType';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { TestingModule, Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { companyRepositoryMock } from '../../../domain/interfaces/repository.mock';
import { FindOneCompanyUseCase } from './findone-company.use-case';
import Optional from 'src/shared/core/Option';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyCode } from '../../../domain/value-objects/code.value-object';
import { CompanyName } from '../../../domain/value-objects/name.value-object';
import { Version } from 'src/shared/domain/version.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { CompanyErrors } from '../../../domain/errors/company.error';
import { AppError } from 'src/shared/core/errors/AppError';

describe('Testing Create-Company Use-Case', () => {
  let findOneCompanyUseCase: FindOneCompanyUseCase;
  let companyRepoMock: MockType<ICompanyRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        FindOneCompanyUseCase,
        {
          provide: 'ICompanyRepository',
          useFactory: companyRepositoryMock,
        },
      ],
    }).compile();
    findOneCompanyUseCase = module.get<FindOneCompanyUseCase>(
      FindOneCompanyUseCase,
    );
    companyRepoMock = module.get('ICompanyRepository');
  });

  it('Valid case', async () => {
    const id = new UniqueEntityID('testId');
    const company: Company = Company.create(
      {
        code: CompanyCode.create({ value: 'LOR' }).getValue(),
        name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
        version: Version.create({ value: 1 }).getValue(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
      id,
    ).getValue();
    companyRepoMock.findOneById.mockReturnValue(Optional(company));
    const resp = await findOneCompanyUseCase.execute({ id: id.toString() });
    expect(resp.isRight()).toBeTruthy();
    expect((resp.value.getValue() as Company).equals(company)).toBeTruthy();
  });

  it('Error: CompanyDoesntExist', async () => {
    const id = new UniqueEntityID('testId');
    companyRepoMock.findOneById.mockReturnValue(Optional(null));
    const resp = await findOneCompanyUseCase.execute({ id: id.toString() });
    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof CompanyErrors.CompanyDoesntExist).toBeTruthy();
  });

  it('Error: UnexpectedError', async () => {
    const id = new UniqueEntityID('testId');
    companyRepoMock.findOneById.mockImplementation(() => {
      throw new Error('Test Error');
    });
    const resp = await findOneCompanyUseCase.execute({ id: id.toString() });
    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });
});
