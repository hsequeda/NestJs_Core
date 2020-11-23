import { OR } from './IWhereInput';
import { IPaginatorParams } from './IPaginatorParams';
import { IPayloadResult } from './IPayloadResult';
import { IWhereUnique } from './IWhereUniqueInput';
import { DeepPartial } from 'typeorm';
import { IEntity } from './IEntity';

/**
 *
 * @export
 * @interface IRepository
 * @template T
 */
export interface IRepository<T extends IEntity> {
  paginatedFindAll(
    or?: OR<T>,
    paginator?: IPaginatorParams,
    orderBy?: { [P in keyof T]: 'ASC' | 'DESC' },
    relations?: [keyof T],
  ): Promise<IPayloadResult<T>>;
  findAll?(
    or?: OR<T>,
    orderBy?: { [P in keyof T]: 'ASC' | 'DESC' },
    relations?: [keyof T],
  ): Promise<T[]>;
  findOne(where: IWhereUnique<T>): Promise<T>;
  create(data: DeepPartial<T>): Promise<T>;
  deleteMany(or: OR<T>): Promise<T[]>;
  deleteOne(where: IWhereUnique<T>): Promise<T>;
  updateMany(or: OR<T>, data: DeepPartial<T>): Promise<T[]>;
  updateOne(where: IWhereUnique<T>, data: DeepPartial<T>): Promise<T>;
}
