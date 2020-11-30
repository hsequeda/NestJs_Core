import { FieldOptions } from 'src/shared/modules/database/types/IFieldOptions';
import { QualitativeFieldOptions } from 'src/shared/modules/database/types/IQualitativeFieldOptions';
import { PaginatorParams } from 'src/shared/core/PaginatorParams';
import { PayloadResult } from 'src/shared/core/PayloadResult';
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

export type OrCompany = WhereCompany[];

export enum OrderCompany {
  DESCRIPTION_ASC = 'DESCRIPTION_ASC',
  DESCRIPTION_DESC = 'DESCRIPTION_DESC',
  CODE_ASC = 'CODE_ASC',
  CODE_DESC = 'CODE_DESC',
}

export interface ICompanyRepository {
  exist(whereUnique: WhereCompany): Promise<boolean> | boolean;
  find(where: OrCompany): Promise<Company[]> | Company[];
  findOne(whereUnique: WhereUniqueCompany): Promise<Company> | Company;
  paginatedFind(
    paginatorParams: PaginatorParams,
    where?: OrCompany,
    order?: OrderCompany,
  ): Promise<PayloadResult<Company>> | PayloadResult<Company>;
  create(company: Company): Promise<void> | void;
  update(
    where: WhereUniqueCompany,
    lastUpdate: Date,
    data: Partial<Company>,
  ): Promise<void> | void;
  delete(where: WhereUniqueCompany): Promise<void> | void;
}
