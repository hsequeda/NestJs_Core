import {
  ICompanyRepository,
  OrderCompanyEnum,
  WhereCompany,
} from '../../domain/interfaces/IRepository';
import { PageParams } from 'src/shared/core/PaginatorParams';
import {
  PaginatedFindResult,
  defaultPaginatedFindResult,
} from '../../../../core/PaginatedFindResult';
import { Repository, IsNull, Not, FindOperator } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Company } from '../../domain/entities/company.entity';
import { CompanyMap } from '../mapper/company.mapper';
import { TypeORMDataAccessUtils } from 'src/shared/modules/data-access/typeorm/field-options.parser';
import { has, isNil } from 'lodash';
import { Version } from 'src/shared/domain/version.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { CompanyName } from '../../domain/value-objects/name.value-object';
import { CompanyCode } from '../../domain/value-objects/code.value-object';
import Optional from 'src/shared/core/Option';
import { Logger } from '@nestjs/common';

export class CompanyRepository implements ICompanyRepository {
  private _logger: Logger;
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly _companyRepository: Repository<CompanyEntity>,
  ) {
    this._logger = new Logger('CompanyRepository');
  }

  async existCompanyWithName(name: CompanyName): Promise<boolean> {
    this._logger.log('Exist Company with name');
    return (
      (await this._companyRepository.count({
        where: { name: name.value, deletedAt: IsNull() },
      })) > 0
    );
  }

  async existCompanyWithCode(code: CompanyCode): Promise<boolean> {
    this._logger.log('Exist Company with code');
    return (
      (await this._companyRepository.count({
        where: { code: code.value, deletedAt: IsNull() },
      })) > 0
    );
  }

  async create(company: Company): Promise<void> {
    this._logger.log('Persistent Company');
    const partialCompanyEntity = CompanyMap.DomainToPersitent(company);
    console.log(partialCompanyEntity);
    await this._companyRepository.create(partialCompanyEntity).save();
  }

  async update(company: Company, currentVersion: Version): Promise<void> {
    this._logger.log('Persist update Company');
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

  async delete(id: UniqueEntityID, currentVersion: Version): Promise<void> {
    this._logger.log('Removing Company from database');
    await this._companyRepository.manager.transaction(async txManager => {
      const company = await txManager.findOne(CompanyEntity, id.toString());
      if (company.version > currentVersion.value)
        throw new Error(
          'The version of the persisted entity is greater than the one passed through the parameters',
        );
      company.version = currentVersion.value;
      company.deletedAt = new Date();
      await txManager.save(company);
    });
  }

  async findOneById(
    id: UniqueEntityID,
    active?: boolean,
  ): Promise<Optional<Company>> {
    this._logger.log('Find One Company by its id');
    const where: { id: string; deletedAt?: FindOperator<Date> } = {
      id: id.toString(),
    };
    if (!isNil(active)) where.deletedAt = active ? IsNull() : Not(IsNull());
    const company: CompanyEntity = await this._companyRepository.findOne({
      where,
    });
    return Optional(company).map(CompanyMap.PersistentToDomain);
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
    paginatorParams: PageParams,
    where?: WhereCompany,
    orderEnum?: OrderCompanyEnum,
  ): Promise<PaginatedFindResult<Company>> {
    this._logger.log(
      `Find paginated companies in page '${paginatorParams.pageNum}' with a page limit of '${paginatorParams.pageLimit}'`,
    );
    const rawWhere = this.toRawWhere(where);
    const orderBy = this.getCompanyOrderByEnum(orderEnum);
    const companyQty = await this._companyRepository.count({
      where: rawWhere,
    });
    this._logger.verbose(`Quantity of actives companies: ${companyQty}`);
    if (companyQty === 0) return defaultPaginatedFindResult;
    const pageLimit: number =
      paginatorParams.pageLimit < companyQty
        ? paginatorParams.pageLimit
        : companyQty;
    const totalPages: number = Math.ceil(companyQty / pageLimit);
    const currentPage: number =
      paginatorParams.pageNum < totalPages
        ? paginatorParams.pageNum
        : totalPages;
    const findOffset = pageLimit * (currentPage - 1);

    this._logger.verbose(`currentPage: ${currentPage}`);
    this._logger.verbose(`offset: ${findOffset}`);
    const persistentCompanies = await this._companyRepository.find({
      where: rawWhere,
      order: orderBy,
      skip: findOffset,
      take: pageLimit,
    });
    const domainCompanies = persistentCompanies.map(persistentCompany =>
      CompanyMap.PersistentToDomain(persistentCompany),
    );
    return {
      items: domainCompanies,
      limit: paginatorParams.pageLimit,
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
    return { ...rawWhere, deletedAt: IsNull() };
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
