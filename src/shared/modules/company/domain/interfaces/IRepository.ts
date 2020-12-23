import { Company } from '../entities/company.entity';
import { FieldOptions } from 'src/shared/modules/data-access/types/IFieldOptions';
import { QualitativeFieldOptions } from 'src/shared/modules/data-access/types/IQualitativeFieldOptions';
import { PaginatedFindResult } from 'src/shared/core/PaginatedFindResult';
import { PageParams } from 'src/shared/core/PaginatorParams';
import { Version } from 'src/shared/domain/version.value-object';
import { CompanyCode } from '../value-objects/code.value-object';
import { CompanyName } from '../value-objects/name.value-object';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import Optional from 'src/shared/core/Option';

export type WhereCompany = {
  id?: FieldOptions<string | number>;
  code?: QualitativeFieldOptions;
  name?: QualitativeFieldOptions;
};

export enum OrderCompanyEnum {
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  CODE_ASC = 'CODE_ASC',
  CODE_DESC = 'CODE_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
}

export interface ICompanyRepository {
  /**
   * Check if exist an active Company with the passed 'name'
   *
   * @param {string} name
   * @returns  {(Promise<boolean> | boolean)}
   * @memberof ICCompanyRepository
   */
  existCompanyWithName(name: CompanyName): Promise<boolean> | boolean;

  /**
   * Check if exist an active Company with the passed 'code'
   *
   * @param {string} code
   * @returns  {(Promise<boolean> | boolean)}
   * @memberof ICCompanyRepository
   */
  existCompanyWithCode(code: CompanyCode): Promise<boolean> | boolean;

  /**
   * Persist a new Company.
   *
   * @param {Company} company
   * @returns  {(Promise<void> | void)}
   * @memberof ICCompanyRepository
   */
  create(company: Company): Promise<void> | void;

  /**
   * Update a Company.
   *
   * @param {Company} company
   * @returns  {(Promise<void> | void)}
   * @memberof ICCompanyRepository
   */
  update(company: Company, currentVersion: Version): Promise<void> | void;

  /**
   * Mark as 'inactive' a Company.
   *
   * @param {string} id
   * @returns  {(Promise<void> | void)}
   * @memberof ICCompanyRepository
   */
  delete(id: UniqueEntityID, currentVersion: Version): Promise<void> | void;

  paginatedFindCompany(
    paginatorParams: PageParams,
    where?: WhereCompany,
    order?: OrderCompanyEnum,
  ): Promise<PaginatedFindResult<Company>> | PaginatedFindResult<Company>;
  findOneById(
    id: UniqueEntityID,
    active?: boolean,
  ): Promise<Optional<Company>> | Optional<Company>;
  // findAllCompanies(where?: WhereCompany): Promise<Company[]> | Company[];
}
