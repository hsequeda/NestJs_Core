import {
  ICompanyRepository,
  OrderCompanyEnum,
  WhereUniqueCompany,
  WhereCompany,
  WhereCompanyExist,
} from '../../domain/interfaces/IRepository';
import { PaginatorParams } from 'src/shared/core/PaginatorParams';
import {
  PaginatedFindResult,
  defaultPaginatedFindResult,
} from '../../../../core/PaginatedFindResult';
import { Repository, Equal } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Company } from '../../domain/entities/company.entity';
import { CompanyMap } from '../mapper/company.mapper';
import { TypeORMDataAccessUtils } from 'src/shared/modules/data-access/typeorm/field-options.parser';
import { has, isNil } from 'lodash';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly _companyRepository: Repository<CompanyEntity>,
  ) {}

  async existCompany(where: WhereCompanyExist): Promise<boolean> {
    const rawWhere = this.toRawWhere(where);
    rawWhere.active = Equal(true);
    const companyCount = await this._companyRepository.count({
      where: rawWhere,
    });
    return companyCount > 0;
  }

  async findAllCompanies(where?: WhereCompany): Promise<Company[]> {
    const rawWhere = this.toRawWhere(where);
    const companies = await this._companyRepository.find({
      where: rawWhere,
    });

    return companies.map(company => {
      return CompanyMap.PersistenttoDomain(company);
    });
  }

  async findOneCompany(whereUnique: WhereUniqueCompany): Promise<Company> {
    const company = await this._companyRepository.findOne({
      active: true,
      ...whereUnique,
    });
    if (isNil(company)) throw new Error('Company not found');
    return CompanyMap.PersistenttoDomain(company);
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
        CompanyMap.PersistenttoDomain(persistentCompany),
      ),
      limit: pageLimit,
      currentPage,
      totalPages,
    };
  }

  async save(company: Company): Promise<void> {
    const partialCompanyEntity = CompanyMap.DomaintoPersitent(company);
    await this._companyRepository.create(partialCompanyEntity).save();
  }

  async delete(where: WhereUniqueCompany): Promise<void> {
    await this._companyRepository.update(where, { active: false });
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
