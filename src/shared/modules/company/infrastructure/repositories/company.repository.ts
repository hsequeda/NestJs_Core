import {
  ICompanyRepository,
  OrderCompanyEnum,
  WhereCompany,
} from '../../domain/interfaces/IRepository';
import { PaginatorParams } from 'src/shared/core/PaginatorParams';
import {
  PaginatedFindResult,
  defaultPaginatedFindResult,
} from '../../../../core/PaginatedFindResult';
import { Repository, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Company } from '../../domain/entities/company.entity';
import { CompanyMap } from '../mapper/company.mapper';
import { TypeORMDataAccessUtils } from 'src/shared/modules/data-access/typeorm/field-options.parser';
import { has, isNil } from 'lodash';
import { Version } from 'src/shared/domain/version.value-object';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly _companyRepository: Repository<CompanyEntity>,
  ) {}

  async existCompanyWithId(id: string): Promise<boolean> {
    return (
      (await this._companyRepository.count({
        where: { id, deletedAt: IsNull() },
      })) > 0
    );
  }

  async existCompanyWithName(name: string): Promise<boolean> {
    return (
      (await this._companyRepository.count({
        where: { name, deletedAt: IsNull() },
      })) > 0
    );
  }

  async existCompanyWithCode(code: string): Promise<boolean> {
    return (
      (await this._companyRepository.count({
        where: { code, deletedAt: IsNull() },
      })) > 0
    );
  }

  async create(company: Company): Promise<void> {
    const partialCompanyEntity = CompanyMap.DomainToPersitent(company);
    console.log(partialCompanyEntity);
    await this._companyRepository.create(partialCompanyEntity).save();
  }

  async update(company: Company, currentVersion: Version): Promise<void> {
    const partialCompanyEntity = CompanyMap.DomainToPersitent(company);
    const queryRunner = this._companyRepository.queryRunner;
    queryRunner.startTransaction();
    try {
      const persitedCompany = await this._companyRepository.findOne({
        where: { id: partialCompanyEntity.id },
      });
      if (persitedCompany.version > currentVersion.value)
        throw new Error(
          'The version of the persisted entity is greater than the one passed through the parameters',
        );
      await this._companyRepository.create(partialCompanyEntity).save();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string, currentVersion: Version): Promise<void> {
    const queryRunner = this._companyRepository.queryRunner;
    queryRunner.startTransaction();
    try {
      const persitedCompany = await this._companyRepository.findOne({
        where: { id },
      });
      if (persitedCompany.version > currentVersion.value)
        throw new Error(
          'The version of the persisted entity is greater than the one passed through the parameters',
        );
      persitedCompany.version = currentVersion.value;
      persitedCompany.deletedAt = new Date();
      persitedCompany.save();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findOneById(id: string): Promise<Company> {
    const company: CompanyEntity = await this._companyRepository.findOne({
      where: { id },
    });
    if (isNil(company)) throw new Error('Company not found');
    return CompanyMap.PersistentToDomain(company);
  }

  async findAllCompanies(where?: WhereCompany): Promise<Company[]> {
    const rawWhere = this.toRawWhere(where);
    const companies = await this._companyRepository.find({
      where: rawWhere,
    });

    return companies.map(company => {
      return CompanyMap.PersistentToDomain(company);
    });
  }

  async paginatedFindCompany(
    paginatorParams: PaginatorParams,
    where?: WhereCompany,
    orderEnum?: OrderCompanyEnum,
  ): Promise<PaginatedFindResult<Company>> {
    const rawWhere = this.toRawWhere(where);

    const orderBy = this.getCompanyOrderByEnum(orderEnum);

    const companyQty = await this._companyRepository.count({
      where: rawWhere,
    });

    if (companyQty === 0) return defaultPaginatedFindResult;

    const pageLimit: number =
      paginatorParams.pageLimit < companyQty
        ? paginatorParams.pageLimit
        : companyQty;

    const totalPages: number = Math.trunc(companyQty / pageLimit);

    const currentPage: number =
      paginatorParams.pageNum < totalPages
        ? paginatorParams.pageNum
        : totalPages;

    const pageNum: number =
      paginatorParams.pageNum < totalPages
        ? paginatorParams.pageNum
        : totalPages;

    const findOffset = pageLimit * pageNum;

    const persistentCompanies = await this._companyRepository.find({
      where: rawWhere,
      order: orderBy,
      skip: findOffset,
      take: pageLimit,
    });

    return {
      items: persistentCompanies.map(persistentCompany =>
        CompanyMap.PersistentToDomain(persistentCompany),
      ),
      limit: pageLimit,
      currentPage,
      totalPages,
    };
  }

  private toRawWhere(where: WhereCompany): any {
    const rawWhere: any = {};
    if (has(where, 'id'))
      rawWhere.id = TypeORMDataAccessUtils.parseFieldOption(where.id);
    if (has(where, 'code'))
      rawWhere.code = TypeORMDataAccessUtils.parseQualitativeFieldOption(
        where.code,
      );
    if (has(where, 'name'))
      rawWhere.name = TypeORMDataAccessUtils.parseQualitativeFieldOption(
        where.name,
      );
    if (has(where, 'active'))
      rawWhere.active = TypeORMDataAccessUtils.parseFieldOption(where.active);
    return { ...rawWhere };
  }

  private getCompanyOrderByEnum(
    order?: OrderCompanyEnum,
  ): {
    [P in 'code' | 'id' | 'name' | 'updatedAt' | 'createdAt']?: 'ASC' | 'DESC';
  } {
    if (!order) return { createdAt: 'ASC' };
    switch (order) {
      case OrderCompanyEnum.ID_ASC:
        return { id: 'ASC' };
      case OrderCompanyEnum.ID_DESC:
        return { id: 'DESC' };
      case OrderCompanyEnum.CODE_ASC:
        return { code: 'ASC' };
      case OrderCompanyEnum.CODE_DESC:
        return { code: 'DESC' };
      case OrderCompanyEnum.NAME_ASC:
        return { name: 'ASC' };
      case OrderCompanyEnum.NAME_DESC:
        return { name: 'DESC' };
      case OrderCompanyEnum.UPDATED_AT_ASC:
        return { updatedAt: 'ASC' };
      case OrderCompanyEnum.UPDATED_AT_DESC:
        return { updatedAt: 'DESC' };
      case OrderCompanyEnum.CREATED_AT_ASC:
        return { createdAt: 'ASC' };
      case OrderCompanyEnum.CREATED_AT_DESC:
        return { createdAt: 'DESC' };
    }
  }
}
