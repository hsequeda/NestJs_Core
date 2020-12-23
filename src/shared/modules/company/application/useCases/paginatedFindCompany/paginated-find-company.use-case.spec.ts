import { PaginatedFindCompanyUseCase } from './paginated-find-company.use-case';
import { MockType } from 'src/shared/core/interfaces/MockType';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { TestingModule, Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { companyRepositoryMock } from '../../../domain/interfaces/repository.mock';
import { PaginatedFindResult } from 'src/shared/core/PaginatedFindResult';
import { Company } from '../../../domain/entities/company.entity';
import { AppError } from 'src/shared/core/errors/AppError';

describe('Testing Create-Company Use-Case', () => {
  let paginatedFindCompanyUseCase: PaginatedFindCompanyUseCase;
  let companyRepoMock: MockType<ICompanyRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        PaginatedFindCompanyUseCase,
        {
          provide: 'ICompanyRepository',
          useFactory: companyRepositoryMock,
        },
      ],
    }).compile();
    paginatedFindCompanyUseCase = module.get<PaginatedFindCompanyUseCase>(
      PaginatedFindCompanyUseCase,
    );
    companyRepoMock = module.get('ICompanyRepository');
  });

  it('Valid case', async () => {
    const paginatedFindCompany: PaginatedFindResult<Company> = {
      limit: 1,
      totalPages: 1,
      currentPage: 1,
      items: [{} as Company],
    };
    companyRepoMock.paginatedFindCompany.mockReturnValue(paginatedFindCompany);
    const resp = await paginatedFindCompanyUseCase.execute({
      pageParams: { pageNum: 1, pageLimit: 1 },
    });

    expect(resp.isRight()).toBeTruthy();
    expect(
      (resp.value.getValue() as PaginatedFindResult<Company>).limit,
    ).toEqual(1);
    expect(
      (resp.value.getValue() as PaginatedFindResult<Company>).currentPage,
    ).toEqual(1);
    expect(
      (resp.value.getValue() as PaginatedFindResult<Company>).totalPages,
    ).toEqual(1);
    expect(
      (resp.value.getValue() as PaginatedFindResult<Company>).items.length,
    ).toEqual(1);
  });
  it('Error: Invalid pageNum', async () => {
    const resp = await paginatedFindCompanyUseCase.execute({
      pageParams: { pageNum: -1, pageLimit: 1 },
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
  });

  it('Error: Invalid pageLimit', async () => {
    const resp = await paginatedFindCompanyUseCase.execute({
      pageParams: { pageNum: 1, pageLimit: -25 },
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
  });

  it('Error: unexpected error', async () => {
    companyRepoMock.paginatedFindCompany.mockImplementation(() => {
      throw new Error('Test Error');
    });
    const resp = await paginatedFindCompanyUseCase.execute({
      pageParams: { pageNum: 1, pageLimit: 1 },
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });
});
