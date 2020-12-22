import { MockType } from 'src/shared/core/interfaces/MockType';
import { ICompanyRepository } from './IRepository';
import { Company } from '../entities/company.entity';
import {
  defaultPaginatedFindResult,
  PaginatedFindResult,
} from 'src/shared/core/PaginatedFindResult';

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
