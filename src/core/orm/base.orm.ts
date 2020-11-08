import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  Repository,
  UpdateResult,
  In,
  LessThanOrEqual,
  LessThan,
  MoreThanOrEqual,
  MoreThan,
  DeepPartial,
  ILike,
  Not,
  Between,
  IsNull,
  Any,
  Equal,
} from 'typeorm';
import { IPayloadResult } from '../interfaces/IPayloadResult';
import { PaginatorParams } from 'src/shared/dto/paginator.params.dto';
import { IWhere, OR } from '../interfaces/IWhereInput';
import { AppBaseEntity } from '../entity/base.entity';
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
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * Generic class to handle the database basic interaction (CRUD).
 *
 * @export
 * @class BaseOrm
 * @template T extends AppBaseEntity
 */
@Injectable()
export abstract class BaseOrm<T extends AppBaseEntity> {
  constructor(public _repository: Repository<T>) {}

  /**
   * Find all the T objects that match with the where condition and returns a paginated structure of this.
   * If you don't pass the where parameter then return all objects.
   * If you don't pass the paginator parameter then return all objects in the same page.
   *
   *
   * @param {OR<T>} [where]
   * @param {PaginatorParams} [paginator]
   * @param {*} [orderBy]
   * @returns  {Promise<IPayloadResult<T>>}
   * @memberof BaseOrm
   */
  async find(
    or?: OR<T>,
    paginator?: PaginatorParams,
    orderBy?: any,
  ): Promise<IPayloadResult<T>> {
    const where = this.getWhere(or);
    const totalItems = await this._repository.count({ where });
    const limit: number =
      paginator && paginator.limit > totalItems ? paginator.limit : totalItems;
    const totalPages: number =
      totalItems !== 0 ? Math.trunc(totalItems / limit) : 1;
    const currentPage: number = paginator ? paginator.page : 1;
    const offset: number = (currentPage - 1) * limit;
    return {
      items: await this._repository.find({
        where,
        skip:
          offset > totalItems ? totalItems - (totalItems % totalPages) : offset,
        take: limit,
      }),
      totalItems,
      limit,
      currentPage,
      totalPages,
    };
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
    return this._repository.save(item);
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

  async deleteMany(where: OR<T>): Promise<T[]> {
    const entities: IPayloadResult<T> = await this.find(where);
    if (entities.totalItems === 0) return null;
    const deleteResult = await this._repository
      .createQueryBuilder()
      .delete()
      .where(
        entities.items.map(entity => {
          return { id: entity.id };
        }),
      )
      .execute();
    if (deleteResult.affected === 0) return null;
    return entities.items;
  }

  async updateOne(where: IWhereUnique<T>, data: DeepPartial<T>): Promise<any> {
    const entity: T = await this.findOne(where);
    if (!entity) return null;
    Object.assign(entity, data);
    return this._repository.save(entity as any);
  }

  async updateMany(
    where: OR<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const entities: IPayloadResult<T> = await this.find(where);
    if (entities.totalItems === 0) return null;
    const data2 = entities.items.map((entity: T) => {
      return Object.assign(entity, data) as T;
    });

    return this._repository.save(data2 as any);
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

  private resolveQualitativeFieldOptions<Qualitative extends string>(
    strFieldOptions: IQualitativeFieldOptions<Qualitative>,
  ): any {
    const [key, value]: [string, Qualitative | Qualitative[]] = Object.entries(
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
