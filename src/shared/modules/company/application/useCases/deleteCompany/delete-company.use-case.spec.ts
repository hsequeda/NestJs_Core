import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { Company } from '../../../domain/entities/company.entity';
import {
  PaginatedFindResult,
  defaultPaginatedFindResult,
} from 'src/shared/core/PaginatedFindResult';
import { MockType } from 'src/shared/core/interfaces/MockType';
import { DeleteCompanyUseCase } from './delete-company.use-case';
import { TestingModule, Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { CompanyCode } from '../../../domain/value-objects/code.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { CompanyName } from '../../../domain/value-objects/name.value-object';
import { Version } from 'src/shared/domain/version.value-object';
import { CompanyErrors } from '../../../domain/errors/company.error';
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

describe('Testing Delete-Company Use-Case', () => {
  let deleteCompanyUseCase: DeleteCompanyUseCase;
  let companyRepoMock: MockType<ICompanyRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        DeleteCompanyUseCase,
        {
          provide: 'ICompanyRepository',
          useFactory: companyRepositoryMock,
        },
      ],
    }).compile();
    deleteCompanyUseCase = module.get<DeleteCompanyUseCase>(
      DeleteCompanyUseCase,
    );
    companyRepoMock = module.get('ICompanyRepository');
  });

  it('Valid Case', async () => {
    const id = 'companyID';
    companyRepoMock.existCompanyWithId.mockReturnValue(true);
    companyRepoMock.findOneById.mockReturnValue(
      Company.create(
        {
          code: CompanyCode.create({ value: 'LOR' }).getValue(),
          name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
        },
        new UniqueEntityID(id),
      ).getValue(),
    );

    let deletedId: string;
    let deletedVersion: Version;

    companyRepoMock.delete.mockImplementation((id, version) => {
      deletedId = id;
      deletedVersion = version;

      return {};
    });

    const resp = await deleteCompanyUseCase.execute({ id, version: 1 });
    expect(resp.isRight()).toBeTruthy();
    expect(deletedId).toEqual(id);
    expect(
      deletedVersion.equals(Version.create({ value: 1 }).getValue()),
    ).toBeTruthy();
  });

  it('Error: CompanyDoesntExist', async () => {
    companyRepoMock.existCompanyWithId.mockReturnValue(false);

    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      version: 1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof CompanyErrors.CompanyDoesntExist).toBeTruthy();
  });

  it('Error: Invalid version', async () => {
    companyRepoMock.existCompanyWithId.mockReturnValue(true);

    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      version: -1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
  });

  it('Error: exist company repository error', async () => {
    companyRepoMock.existCompanyWithId.mockImplementation(() => {
      throw new Error('Test Error');
    });

    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      version: 1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });

  it('Error: find one repository error', async () => {
    companyRepoMock.existCompanyWithId.mockReturnValue(true);
    companyRepoMock.findOneById.mockImplementation(() => {
      throw new Error('Test Error');
    });

    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      version: 1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });
});
