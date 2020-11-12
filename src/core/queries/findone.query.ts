import { BaseQuery } from './base.query';
import { AppBaseEntity } from '../entity/base.entity';
import { IWhereUnique } from '../interfaces/IWhereUniqueInput';

export class FindOneQuery<T extends AppBaseEntity> extends BaseQuery {
  constructor(public where: IWhereUnique<T>, public select?: keyof T[]) {
    super();
  }
}
