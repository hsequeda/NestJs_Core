import { IOrientation } from './IOrientation';
import { QualitativeFieldOptions } from 'src/shared/modules/database/types/IQualitativeFieldOptions';
import { FieldOptions } from 'src/shared/modules/database/types/IFieldOptions';
import { PaginatorParams } from '../../../../shared/core/PaginatorParams';
import { PayloadResult } from '../../../../shared/core/PayloadResult';

interface WhereOrientation {
  id?: FieldOptions<string | number>;
  code?: QualitativeFieldOptions;
  description?: QualitativeFieldOptions;
}

interface WhereUniqueOrientation {
  code: string;
  description: string;
}

type OrOrientation = WhereOrientation[];

export enum OrderOrientation {
  DESCRIPTION_ASC = 'DESCRIPTION_ASC',
  DESCRIPTION_DESC = 'DESCRIPTION_DESC',
  CODE_ASC = 'CODE_ASC',
  CODE_DESC = 'CODE_DESC',
}

export interface IOrientationRepository {
  find(where: OrOrientation): Promise<IOrientation[]>;
  findOne(
    whereUnique: WhereUniqueOrientation,
    companyId: string,
  ): Promise<IOrientation>;
  paginatedFind(
    paginatorParams: PaginatorParams,
    where: OrOrientation,
    order: OrderOrientation,
  ): Promise<PayloadResult<IOrientation>>;
  create(orientation: IOrientation, companyId: string): Promise<IOrientation>;
  update(
    where: WhereUniqueOrientation,
    data: Partial<IOrientation>,
  ): Promise<IOrientation>;
  delete(where: WhereUniqueOrientation): Promise<IOrientation>;
}
