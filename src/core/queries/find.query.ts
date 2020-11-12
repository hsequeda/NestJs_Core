import { BaseQuery } from './base.query';
import { OR } from '../interfaces/IWhereInput';
import { AppBaseEntity } from '../entity/base.entity';
import { PaginatorParams } from 'src/shared/dto/paginator.params.dto';

export class FindQuery<T extends AppBaseEntity> extends BaseQuery {
  constructor(
    public where?: OR<T>,
    public paginatorOptions?: PaginatorParams,
    public orderBy?: string,
    public select?: keyof T[],
  ) {
    super();
  }
}
