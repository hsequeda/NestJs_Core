import { MockType } from 'src/shared/core/interfaces/MockType';
import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { TestingModule, Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { companyRepositoryMock } from '../../../domain/interfaces/repository.mock';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyName } from '../../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../../domain/value-objects/code.value-object';
import { Version } from 'src/shared/domain/version.value-object';
import { UpdateCompanyUseCase } from './update-company.use-case';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { CompanyErrors } from '../../../domain/errors/company.error';
import { AppError } from 'src/shared/core/errors/AppError';
import Optional from 'src/shared/core/Option';

describe('Testing Update-Company Use-Case', () => {
  let updateCompanyUseCase: UpdateCompanyUseCase;
  let companyRepoMock: MockType<ICompanyRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        UpdateCompanyUseCase,
        {
          provide: 'ICompanyRepository',
          useFactory: companyRepositoryMock,
        },
      ],
    }).compile();
    updateCompanyUseCase = module.get<UpdateCompanyUseCase>(
      UpdateCompanyUseCase,
    );
    companyRepoMock = module.get('ICompanyRepository');
  });

  it('Valid case: Update name', async () => {
    let persistedCompany: Company;
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    companyRepoMock.update.mockImplementation((updatedCompany: Company) => {
      persistedCompany = updatedCompany;
      return {};
    });
    const createdAt = new Date();
    const updatedAt = new Date();
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt,
            updatedAt,
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      name: 'new Name',
    });

    expect(resp.isRight()).toBeTruthy();
    expect(
      persistedCompany.name.equals(
        CompanyName.create({ value: 'new Name' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.code.equals(
        CompanyCode.create({ value: 'LOR' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.version.equals(Version.create({ value: 2 }).getValue()),
    ).toBeTruthy();
    expect(persistedCompany.isActive).toBeTruthy();
    expect(persistedCompany.createdAt.getTime()).toEqual(createdAt.getTime());
    expect(persistedCompany.updatedAt.getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime(),
    );
  });

  it('Valid case: Update code', async () => {
    let persistedCompany: Company;
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.update.mockImplementation((updatedCompany: Company) => {
      persistedCompany = updatedCompany;
      return {};
    });
    const createdAt = new Date();
    const updatedAt = new Date();
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt,
            updatedAt,
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      code: 'NCOD',
    });

    expect(resp.isRight()).toBeTruthy();
    expect(
      persistedCompany.name.equals(
        CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.code.equals(
        CompanyCode.create({ value: 'NCOD' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.version.equals(Version.create({ value: 2 }).getValue()),
    ).toBeTruthy();
    expect(persistedCompany.isActive).toBeTruthy();
    expect(persistedCompany.createdAt.getTime()).toEqual(createdAt.getTime());
    expect(persistedCompany.updatedAt.getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime(),
    );
  });

  it('Valid case: Update code and name', async () => {
    let persistedCompany: Company;
    companyRepoMock.existCompanyWithName.mockReturnValue(false);
    companyRepoMock.existCompanyWithCode.mockReturnValue(false);
    companyRepoMock.update.mockImplementation((updatedCompany: Company) => {
      persistedCompany = updatedCompany;
      return {};
    });
    const createdAt = new Date();
    const updatedAt = new Date();
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt,
            updatedAt,
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      code: 'NCOD',
      name: 'New name',
    });

    expect(resp.isRight()).toBeTruthy();
    expect(
      persistedCompany.name.equals(
        CompanyName.create({ value: 'New name' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.code.equals(
        CompanyCode.create({ value: 'NCOD' }).getValue(),
      ),
    ).toBeTruthy();
    expect(
      persistedCompany.version.equals(Version.create({ value: 3 }).getValue()),
    ).toBeTruthy();
    expect(persistedCompany.isActive).toBeTruthy();
    expect(persistedCompany.createdAt.getTime()).toEqual(createdAt.getTime());
    expect(persistedCompany.updatedAt.getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime(),
    );
  });

  it('Valid case: No update', async () => {
    let persistedCompany: Company;
    companyRepoMock.update.mockImplementation((updatedCompany: Company) => {
      persistedCompany = updatedCompany;
      return {};
    });
    const createdAt = new Date();
    const updatedAt = new Date();
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt,
            updatedAt,
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
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
    expect(persistedCompany.createdAt.getTime()).toEqual(createdAt.getTime());
    expect(persistedCompany.updatedAt.getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime(),
    );
  });

  it(`Error Case: Company doesn't exist`, async () => {
    companyRepoMock.findOneById.mockReturnValue(Optional(null));
    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof CompanyErrors.CompanyDoesntExist).toBeTruthy();
  });

  it(`Error Case: ExistCompanyWithId returns unexpected error`, async () => {
    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });

  it(`Error Case: Code validation error`, async () => {
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      code: 'Invalid code',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
  });

  it(`Error Case: Name validation error`, async () => {
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      name: 'New invalid name (to long!!!!!!!!!!)',
    });

    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
  });

  it(`Error Case: Company is deleted`, async () => {
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      name: 'new Name',
    });
    expect(resp.isLeft()).toBeTruthy();
    expect(
      resp.value instanceof CompanyErrors.CompanyHasBeenDeleted,
    ).toBeTruthy();
  });

  it(`Error Case: FindOneById unexpected error`, async () => {
    companyRepoMock.findOneById.mockImplementation(() => {
      throw new Error('Test Error');
    });

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      name: 'new Name',
    });
    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });

  it(`Error Case: Version validation error`, async () => {
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: -1,
      name: 'new Name',
    });
    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
  });

  it(`Error Case: Update unexpected error`, async () => {
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          new UniqueEntityID('testId'),
        ).getValue(),
      ),
    );
    companyRepoMock.update.mockImplementation(() => {
      throw new Error('Test Error');
    });

    const resp = await updateCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
      name: 'new Name',
    });
    expect(resp.isLeft()).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });
});
