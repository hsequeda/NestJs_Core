import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  Repository,
  In,
  LessThanOrEqual,
  LessThan,
  MoreThanOrEqual,
  MoreThan,
  ILike,
  Not,
  Between,
  IsNull,
  Any,
  Equal,
  FindManyOptions,
} from 'typeorm';
import { IPayloadResult } from '../interfaces/IPayloadResult';
import { IWhere, OR } from '../interfaces/IWhereInput';
import {
  IQualitativeFieldOptions,
  QualitativeFieldOptionsKeys,
} from '../interfaces/IQualitativeFieldOptions';
import {
  IQuantitativeFieldOptions,
  QuantitativeFieldOptionsKeys,
  IBetween,
} from '../interfaces/IQuantitativeFieldOptions';
import { IFieldOptions, FieldOptionsKeys } from '../interfaces/IFieldOptions';
import { IWhereUnique } from '../interfaces/IWhereUniqueInput';
import { IRepository } from '../interfaces/IRepository';
import { IPaginatorParams } from '../interfaces/IPaginatorParams';
import { IEntity } from '../interfaces/IEntity';
import { DeepPartial } from '../interfaces/IDeepPartial';

/**
 * Generic class to handle the database basic interaction (CRUD).
 *
 * @export
 * @class BaseOrm
 * @template T extends AppBaseEntity
 */
@Injectable()
export abstract class AbstractTypeOrmRepository<T extends IEntity>
  implements IRepository<T> {
  constructor(public _repository: Repository<T>) {}

  /**
   * Find all the T objects that match with the where condition and returns a paginated structure of this.
   * If you don't pass the where parameter then return all objects.
   * If you don't pass the paginator parameter then return all objects in the same page.
   *
   * @param {OR<T>} [or]
   * @param {IPaginatorParams} [paginator]
   * @param {({ [P in keyof T]: 'ASC' | 'DESC' })} [orderBy]
   * @param {[keyof T]} [relations]
   * @returns  {Promise<IPayloadResult<T>>}
   * @memberof BaseOrm
   */
  async paginatedFindAll(
    or?: OR<T>,
    paginator?: IPaginatorParams,
    orderBy?: { [P in keyof T]: 'ASC' | 'DESC' },
    relations?: [keyof T],
  ): Promise<IPayloadResult<T>> {
    const findOptions: FindManyOptions<T> = {};
    if (orderBy) findOptions.order = orderBy;
    if (or) findOptions.where = this.getWhere(or);
    const totalItems = await this._repository.count(findOptions);
    findOptions.take =
      paginator && paginator.limit > totalItems ? paginator.limit : totalItems;
    const totalPages: number =
      totalItems !== 0 ? Math.trunc(totalItems / findOptions.take) : 1;
    const currentPage: number = paginator ? paginator.page : 1;
    const offset: number = (currentPage - 1) * findOptions.take;
    findOptions.skip =
      offset > totalItems ? totalItems - (totalItems % totalPages) : offset;
    findOptions.relations = relations as string[];
    return {
      items: await this._repository.find(findOptions),
      totalItems,
      limit: findOptions.take,
      currentPage,
      totalPages,
    };
  }

  /**
   * Find all the T objects that match with the where condition and returns a list of this.
   * If you don't pass the where parameter then return all objects.
   * If you don't pass the paginator parameter then return all objects in the same page.
   *
   * @param {OR<T>} [or]
   * @param {({ [P in keyof T]: 'ASC' | 'DESC' })} [orderBy]
   * @param {[keyof T]} [relations]
   * @returns  {Promise<T[]>}
   * @memberof BaseOrm
   */
  findAll(
    or?: OR<T>,
    orderBy?: { [P in keyof T]: 'ASC' | 'DESC' },
    relations?: [keyof T],
  ): Promise<T[]> {
    const findOptions: FindManyOptions<T> = {};
    if (orderBy) findOptions.order = orderBy;
    if (or) findOptions.where = this.getWhere(or);
    if (relations) findOptions.relations = relations as string[];
    return this._repository.find(findOptions);
  }

  /**
   * Returns one object T that match with the where expression.
   *
   * @param {*} where
   * @returns  {Promise<T>}
   * @memberof BaseOrm
   */
  async findOne(where: IWhereUnique<T>): Promise<T> {
    return this._repository.findOne({ where });
  }

  /**
   * Create an object T.
   *
   * @param {DeepPartial<T>} item
   * @returns  {Promise<T>}
   * @memberof BaseOrm
   */
  async create(item: DeepPartial<T>): Promise<T> {
    return this._repository.save(item as DeepPartial<T>);
  }

  async deleteOne(where: IWhereUnique<T>): Promise<T> {
    const entity: T = await this.findOne(where);
    if (!entity) return null;
    const deleteResult: DeleteResult = await this._repository
      .createQueryBuilder()
      .delete()
      .where({ id: entity.id })
      .execute();

    if (deleteResult.affected === 0) return null;

    return entity;
  }

  /**
   * Delete all object that match with the where statement. If no object match then returns null.
   *
   * @param {OR<T>} where
   * @returns  {Promise<T[]>}
   * @memberof BaseOrm
   */
  async deleteMany(where: OR<T>): Promise<T[]> {
    const entities: T[] = await this.findAll(where);
    if (entities.length === 0) return null;
    const deleteResult = await this._repository
      .createQueryBuilder()
      .delete()
      .where(
        entities.map(entity => {
          return { id: entity.id };
        }),
      )
      .execute();
    if (deleteResult.affected === 0) return null;
    return entities;
  }

  /**
   * Update one object that match with the where statement. If Object doesn't exist return null.
   *
   * @param {IWhereUnique<T>} where
   * @param {DeepPartial<T>} data
   * @returns  {Promise<any>}
   * @memberof BaseOrm
   */
  async updateOne(where: IWhereUnique<T>, data: DeepPartial<T>): Promise<T> {
    const entity: T = await this.findOne(where);
    if (!entity) return null;
    return this._repository.save(Object.assign(entity, data) as any);
  }

  /**
   * Update all objects that match with the where statement. If no object match then returns null.
   *
   * @param {OR<T>} where
   * @param {DeepPartial<T>} data
   * @returns  {Promise<T[]>}
   * @memberof BaseOrm
   */
  async updateMany(where: OR<T>, data: DeepPartial<T>): Promise<T[]> {
    const entities: T[] = await this.findAll(where);
    if (entities.length === 0) return null;
    return this._repository.save(
      entities.map((entity: T) => Object.assign(entity, data) as T) as any,
    );
  }

  private getWhere(or: OR<T>): any[] {
    return or.map((where: IWhere<T>) => {
      const data = Object.entries(where).map(
        ([findOptionsKey, value]: [string, any]) => {
          if (
            Object.keys(value).find(key =>
              Object.keys(QualitativeFieldOptionsKeys).find(
                enumKey => QualitativeFieldOptionsKeys[enumKey] === key,
              ),
            )
          ) {
            return {
              [findOptionsKey]: this.resolveQualitativeFieldOptions(value),
            };
          }
          if (
            Object.keys(value).find(key =>
              Object.keys(QuantitativeFieldOptionsKeys).find(
                enumKey => QuantitativeFieldOptionsKeys[enumKey] === key,
              ),
            )
          ) {
            return {
              [findOptionsKey]: this.resolveQuantitativeFieldOptions(value),
            };
          }
          return { [findOptionsKey]: this.resolveFieldOptions(value) };
        },
      );
      return Object.assign({}, ...data);
    });
  }

  private resolveFieldOptions<P>(fieldOption: IFieldOptions<P>): any {
    const [key, value]: [string, P | P[]] = Object.entries(fieldOption).pop();
    switch (key) {
      case FieldOptionsKeys.IS_NULL:
        return IsNull();
      case FieldOptionsKeys.ANY:
        return Any(value as P[]);
      case FieldOptionsKeys.IS:
        return Equal(value);
      case FieldOptionsKeys.NOT:
        return Not(Equal(value));
      case FieldOptionsKeys.IN:
        return In(value as P[]);
      case FieldOptionsKeys.NOT_IN:
        return Not(In(value as P[]));
    }
  }

  private resolveQuantitativeFieldOptions<Quantitative extends number | Date>(
    numFieldOption: IQuantitativeFieldOptions<Quantitative>,
  ): any {
    const [key, value]: [
      string,
      Quantitative | Quantitative[] | IBetween<Quantitative>,
    ] = Object.entries(numFieldOption).pop();
    switch (key) {
      case QuantitativeFieldOptionsKeys.LT:
        return LessThan(value);
      case QuantitativeFieldOptionsKeys.LTE:
        return LessThanOrEqual(value);
      case QuantitativeFieldOptionsKeys.GT:
        return MoreThan(value);
      case QuantitativeFieldOptionsKeys.GTE:
        return MoreThanOrEqual(value);
      case QuantitativeFieldOptionsKeys.BETWEEN:
        return Between(
          (value as IBetween<Quantitative>).from,
          (value as IBetween<Quantitative>).to,
        );
      default:
        return this.resolveFieldOptions(numFieldOption);
    }
  }

  private resolveQualitativeFieldOptions<T extends string>(
    strFieldOptions: IQualitativeFieldOptions<T>,
  ): any {
    const [key, value]: [string, string | string[]] = Object.entries(
      strFieldOptions,
    ).pop();
    switch (key) {
      case QualitativeFieldOptionsKeys.CONTAINS:
        return ILike(`%${value}%`);
      case QualitativeFieldOptionsKeys.NOT_CONTAINS:
        return Not(ILike(`%${value}%`));
      case QualitativeFieldOptionsKeys.STARTS_WITH:
        return ILike(`${value}%`);
      case QualitativeFieldOptionsKeys.NOT_STARTS_WITH:
        return Not(ILike(`${value}%`));
      case QualitativeFieldOptionsKeys.ENDS_WITH:
        return ILike(`%${value}`);
      case QualitativeFieldOptionsKeys.NOT_ENDS_WITH:
        return Not(ILike(`%${value}`));
      default:
        return this.resolveFieldOptions(strFieldOptions);
    }
  }
}
