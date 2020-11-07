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
import { IQualitativeFieldOptions } from '../interfaces/IQualitativeFieldOptions';
import { IQuantitativeFieldOptions } from '../interfaces/IQuantitativeFieldOptions';
import { IFieldOptions } from '../interfaces/IFieldOptions';

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

  async find(
    where?: OR<T>,
    paginator?: PaginatorParams,
  ): Promise<IPayloadResult<T>> {
    const totalItems = await this._repository.count();
    const limit: number =
      paginator && paginator.limit > totalItems ? paginator.limit : totalItems;
    const totalPages: number = Math.trunc(totalItems / limit);
    const currentPage: number = paginator ? paginator.page : 1;
    const offset: number = (currentPage - 1) * limit;
    console.log(JSON.stringify(this.getWhere(where)));
    const test = await this._repository.find({
      where: this.getWhere(where),
      skip:
        offset > totalItems ? totalItems - (totalItems % totalPages) : offset,
      take: limit,
    });
    return {
      items: test,
      totalItems,
      limit,
      currentPage,
      totalPages,
    };
  }

  async findOne(where: any): Promise<T> {
    return this._repository.findOne({ where });
  }

  async create(item: DeepPartial<T>): Promise<T> {
    return this._repository.save(item);
  }

  async delete(criteria: any): Promise<DeleteResult> {
    return this._repository.delete(criteria);
  }

  async update(where: IWhere<T>, data: T | any): Promise<UpdateResult> {
    return this._repository
      .createQueryBuilder()
      .update()
      .set(data)
      .execute();
  }

  private getWhere(or: OR<T>): any[] {
    return or.map((where: IWhere<T>) => {
      const data = Object.entries(where).map(([key, value]: [string, any]) => {
        if (value.starts_with) {
          return { [key]: this.resolveQualitativeFieldOptions(value) };
        }
        if (value.gte) {
          return { [key]: this.resolveQuantitativeFieldOptions(value) };
        }
        return { [key]: this.resolveFieldOptions(value) };
      });
      return Object.assign({}, ...data);
    });
  }

  private resolveFieldOptions<P>(fieldOption: IFieldOptions<P>): any {
    const [key, value]: [string, any] = Object.entries(fieldOption).pop();
    switch (key) {
      case 'is_null':
        return IsNull();
      case 'any':
        return Any(value);
      case 'is':
        return Equal(value);
      case 'not':
        return Not(Equal(value));
      case 'in':
        return In(value);
      case 'not_in':
        return Not(In(value));
    }
  }

  private resolveQuantitativeFieldOptions<Quantitative extends number | Date>(
    numFieldOption: IQuantitativeFieldOptions<Quantitative>,
  ): any {
    const [key, value]: [string, any] = Object.entries(numFieldOption).pop();
    switch (key) {
      case 'lt':
        return LessThan(value);
      case 'lte':
        return LessThanOrEqual(value);
      case 'gt':
        return MoreThan(value);
      case 'gte':
        return MoreThanOrEqual(value);
      case 'between':
        return Between(value.from, value.to);
      default:
        return this.resolveFieldOptions(numFieldOption);
    }
  }
  private resolveQualitativeFieldOptions<Qualitative extends String>(
    strFieldOptions: IQualitativeFieldOptions<Qualitative>,
  ): any {
    const [key, value]: [string, any] = Object.entries(strFieldOptions).pop();
    switch (key) {
      case 'contains':
        return ILike(`%${value}%`);
      case 'not_contains':
        return Not(ILike(`%${value}%`));
      case 'starts_with':
        return ILike(`${value}%`);
      case 'not_starts_with':
        return Not(ILike(`${value}%`));
      case 'ends_with':
        return ILike(`%${value}`);
      case 'not_ends_with':
        return Not(ILike(`%${value}`));
      default:
        return this.resolveFieldOptions(strFieldOptions);
    }
  }
}
