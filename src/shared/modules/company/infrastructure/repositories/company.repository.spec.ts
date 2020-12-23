import { CompanyRepository } from './company.repository';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { PageParams } from 'src/shared/core/PaginatorParams';
import { MockType } from 'src/shared/core/interfaces/MockType';
import { Company } from '../../domain/entities/company.entity';

// @ts-ignore // eslint-ignore-line
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
    count: jest.fn(entity => entity),
  }),
);

describe('Testing Company Repository implementation', () => {
  let companyRepository: CompanyRepository;
  let repositoryMock: MockType<Repository<CompanyEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyRepository,
        {
          provide: getRepositoryToken(CompanyEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    companyRepository = module.get<CompanyRepository>(CompanyRepository);
    repositoryMock = module.get(getRepositoryToken(CompanyEntity));
  });

  it('should find a company', async () => {
    const company = {
      id: new UniqueEntityID().toString(),
      name: 'testCompany',
      code: 'TCom',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 2,
    };

    repositoryMock.findOne.mockReturnValue(company);
    const result = (
      await companyRepository.findOneById(new UniqueEntityID(company.id))
    ).getOrElse({} as Company);
    expect(result.updatedAt).toEqual(company.updatedAt);
    expect(result.createdAt).toEqual(company.createdAt);
    expect(result._id.toString()).toEqual(company.id);
    expect(result.name.value).toEqual(company.name);
    expect(result.code.value).toEqual(company.code);
  });

  it("company isn't found", async () => {
    repositoryMock.findOne.mockReturnValue(undefined);
    expect(
      (await companyRepository.findOneById(new UniqueEntityID(''))).getOrElse(
        {} as Company,
      ),
    ).toEqual({});
  });

  it('should returns a Company paginatedPayload', async () => {
    const companies = [
      {
        id: new UniqueEntityID().toString(),
        name: 'testCompany1',
        code: 'TCo1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 2,
      },
      {
        id: new UniqueEntityID().toString(),
        name: 'testCompany2',
        code: 'TCo2',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 1,
      },
    ];
    repositoryMock.find.mockReturnValue(companies);
    repositoryMock.count.mockReturnValue(2);
    const pagParamOrErr = PageParams.create({ pageNum: 1, pageLimit: 1 });
    expect(pagParamOrErr.isSuccess).toEqual(true);
    const paginatedCompanies = await companyRepository.paginatedFindCompany(
      pagParamOrErr.getValue(),
    );
    expect(paginatedCompanies.limit).toEqual(1);
    expect(paginatedCompanies.currentPage).toEqual(1);
    expect(paginatedCompanies.totalPages).toEqual(2);
  });

  it('should returns a default paginatedPayload', async () => {
    repositoryMock.find.mockReturnValue({});
    repositoryMock.count.mockReturnValue(0);
    const pagParamOrErr = PageParams.create({ pageNum: 1, pageLimit: 1 });
    expect(pagParamOrErr.isSuccess).toEqual(true);
    const paginatedCompanies = await companyRepository.paginatedFindCompany(
      pagParamOrErr.getValue(),
    );
    expect(paginatedCompanies.limit).toEqual(0);
    expect(paginatedCompanies.currentPage).toEqual(0);
    expect(paginatedCompanies.totalPages).toEqual(0);
  });
});
