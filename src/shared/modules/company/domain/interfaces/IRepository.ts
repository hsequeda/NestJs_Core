import { PaginatorParams } from 'src/shared/core/PaginatorParams';
import { PayloadResult } from 'src/shared/core/PayloadResult';
import { FieldOptions } from 'src/shared/modules/data-access/types/IFieldOptions';
import { QualitativeFieldOptions } from 'src/shared/modules/data-access/types/IQualitativeFieldOptions';
import { Company } from '../entities/company.entity';

export interface WhereCompany {
  id?: FieldOptions<string | number>;
  code?: QualitativeFieldOptions;
  name?: QualitativeFieldOptions;
}

export interface WhereUniqueCompany {
  id?: string;
  name?: string;
  code?: string;
}

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
  existCompany(where: WhereCompany): Promise<boolean> | boolean;
  findAllCompanies(where?: WhereCompany): Promise<Company[]> | Company[];
  findOneCompany(whereUnique: WhereUniqueCompany): Promise<Company> | Company;
  paginatedFindCompany(
    paginatorParams: PaginatorParams,
    where?: WhereCompany,
    order?: OrderCompanyEnum,
  ): Promise<PayloadResult<Company>> | PayloadResult<Company>;
  save(company: Company): Promise<void> | void;
  delete(where: WhereUniqueCompany): Promise<void> | void;
}
