import { Company } from '../../../domain/entities/company.entity';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import {
  PaginatedFindResult,
  defaultPaginatedFindResult,
} from 'src/shared/core/PaginatedFindResult';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompanyUseCase } from './create-company.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { MockType } from 'src/shared/core/interfaces/MockType';
import { CompanyErrors } from '../../../domain/errors/company.error';
import { CompanyName } from '../../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../../domain/value-objects/code.value-object';
import { Version } from 'src/shared/domain/version.value-object';
import { AppError } from 'src/shared/core/errors/AppError';

export const companyRepositoryMock: () => MockType<
  ICompanyRepository
> = jest.fn(() => ({
  existCompanyWithId: jest.fn(async () => false),
  existCompanyWithName: jest.fn(async () => false),
  existCompanyWithCode: jest.fn(async () => false),
  create: jest.fn(async (company: Company) => company),
  update: jest.fn(async () => {}),
  delete: jest.fn(async () => {}),
  paginatedFindCompany: jest.fn(async () => {
    return defaultPaginatedFindResult as PaginatedFindResult<Company>;
  }),
  findOneById: jest.fn(async () => {
    return {} as Company;
  }),
  findAllCompanies: jest.fn(() => {
    return [{} as Company];
  }),
}));

describe('Testing Create-Company Use-Case', () => {
  let createCompanyUseCase: CreateCompanyUseCase;
  let companyRepoMock: MockType<ICompanyRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateCompanyUseCase,
        {
          provide: 'ICompanyRepository',
          useFactory: companyRepositoryMock,
        },
      ],
    }).compile();
    createCompanyUseCase = module.get<CreateCompanyUseCase>(
      CreateCompanyUseCase,
    );
    companyRepoMock = module.get('ICompanyRepository');
  });

  it('Valid case', async () => {
    let persistedCompany: Company;
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    companyRepoMock.create.mockImplementation((company: Company) => {
      persistedCompany = company;
      return {};
    });
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: 'Lorem ipsum...',
    });

    expect(resp.isRight()).toBeTruthy();
    expect(
      persistedCompany.name.equals(
        CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.code.equals(
        CompanyCode.create({ value: 'LOR' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.version.equals(Version.create({ value: 1 }).getValue()),
    ).toBeTruthy();
    expect(persistedCompany.isActive).toBeTruthy();
    expect(persistedCompany.createdAt.getTime()).toBeLessThan(Date.now());
    expect(persistedCompany.createdAt.getTime()).toBeLessThan(Date.now());
  });

  it('Error: Name should have at least 1 chars', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: '',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual(
      'name should has at least 1 chars',
    );
  });

  it('Error: Name should be lower than 20 chars', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual(
      'name should be lower than 20 chars',
    );
  });

  it('Error: Code should have at least 1 chars', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    const resp = await createCompanyUseCase.execute({
      code: '',
      name: 'Lorem ipsum...',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual(
      'code should has at least 1 chars',
    );
  });

  it('Error: Code should be lower than 4 chars', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    const resp = await createCompanyUseCase.execute({
      code: 'Invalid Code',
      name: 'Lorem ipsum...',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual(
      'code should be lower than 4 chars',
    );
  });

  it('Error: Code exist', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(true);
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: 'Lorem ipsum...',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof CompanyErrors.CodeExistError).toBeTruthy();
    expect(resp.value.errorValue()).toEqual(
      new CompanyErrors.CodeExistError('LOR').errorValue(),
    );
  });

  it('Error: Name exist', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(true);
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: 'Lorem ipsum...',
    });
    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof CompanyErrors.NameExistError).toBeTruthy();
    expect(resp.value.errorValue()).toEqual(
      new CompanyErrors.NameExistError('Lorem ipsum...').errorValue(),
    );
  });

  it('Error: Code undefined', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(true);
    const resp = await createCompanyUseCase.execute({
      code: undefined,
      name: 'Lorem ipsum...',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual('code should be defined');
  });

  it('Error: Name undefined', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(true);
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: undefined,
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual('name should be defined');
  });

  it('Error: Code null', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(true);
    const resp = await createCompanyUseCase.execute({
      code: undefined,
      name: 'Lorem ipsum...',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual('code should be defined');
  });

  it('Error: Name null', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(true);
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: undefined,
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
    expect(resp.value.errorValue().message).toEqual('name should be defined');
  });

  it('Error: Create company repository error', async () => {
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    companyRepoMock.create.mockImplementation(() => {
      throw new Error('Test error');
    });
    const resp = await createCompanyUseCase.execute({
      code: 'LOR',
      name: 'Lorem ipsum...',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });
});
