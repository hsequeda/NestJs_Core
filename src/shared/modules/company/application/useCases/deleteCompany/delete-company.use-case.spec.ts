import { ICompanyRepository } from '../../../domain/interfaces/IRepository';
import { Company } from '../../../domain/entities/company.entity';
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
import { companyRepositoryMock } from '../../../domain/interfaces/repository.mock';
import Optional from 'src/shared/core/Option';

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
    const id = new UniqueEntityID('companyID');
    companyRepoMock.findOneById.mockReturnValue(
      Optional(
        Company.create(
          {
            code: CompanyCode.create({ value: 'LOR' }).getValue(),
            name: CompanyName.create({ value: 'Lorem ipsum...' }).getValue(),
            version: Version.create({ value: 1 }).getValue(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
          },
          id,
        ).getValue(),
      ),
    );

    let deletedId: UniqueEntityID;
    let deletedVersion: Version;

    companyRepoMock.delete.mockImplementation((id, version) => {
      deletedId = id;
      deletedVersion = version;
      return {};
    });

    const resp = await deleteCompanyUseCase.execute({
      id: id.toString(),
      currentVersion: 1,
    });
    console.log(resp);
    expect(resp.isRight()).toBeTruthy();
    expect(deletedId.equals(id)).toBeTruthy();
    expect(
      deletedVersion.equals(Version.create({ value: 1 }).getValue()),
    ).toBeTruthy();
  });

  it('Error: CompanyDoesntExist', async () => {
    companyRepoMock.findOneById.mockReturnValue(Optional(null));
    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof CompanyErrors.CompanyDoesntExist).toBeTruthy();
  });

  it('Error: Invalid version', async () => {
    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      currentVersion: -1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof AppError.ValidationError).toBeTruthy();
  });

  it('Error: exist company repository error', async () => {
    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });

  it('Error: find one repository error', async () => {
    companyRepoMock.findOneById.mockImplementation(() => {
      throw new Error('Test Error');
    });

    const resp = await deleteCompanyUseCase.execute({
      id: 'testId',
      currentVersion: 1,
    });

    expect(resp.isLeft).toBeTruthy();
    expect(resp.value instanceof AppError.UnexpectedError).toBeTruthy();
  });
});
