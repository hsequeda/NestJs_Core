import { PageParamsDto } from 'src/shared/core/PaginatorParams';
import { QualitativeFieldOptions } from 'src/shared/modules/data-access/types/IQualitativeFieldOptions';
import { FieldOptions } from 'src/shared/modules/data-access/types/IFieldOptions';
import { OrderCompanyEnum } from '../../domain/interfaces/IRepository';

export interface PaginatedFindCompanyDto {
  pageParams: PageParamsDto;
  where?: CompanyWhereDto;
  order?: OrderCompanyEnum;
}

export interface CompanyWhereDto {
  id?: FieldOptions<string | number>;
  code?: QualitativeFieldOptions;
  name?: QualitativeFieldOptions;
}
