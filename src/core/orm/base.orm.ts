import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  Repository,
  UpdateResult,
  In,
  Like,
  LessThanOrEqual,
  LessThan,
  MoreThanOrEqual,
  MoreThan,
  SelectQueryBuilder,
  UpdateQueryBuilder,
  DeleteQueryBuilder,
  Brackets,
  WhereExpression,
  DeepPartial,
} from 'typeorm';
import { IPayloadResult } from '../interfaces/IPayloadResult';
import { PaginatorParams } from 'src/shared/dto/paginator.params.dto';
import { IWhereInput } from '../interfaces/IWhereInput';
import { AppBaseEntity } from '../entity/base.entity';

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
    where?: Where,
    paginator?: PaginatorParams,
  ): Promise<IPayloadResult<T>> {
    const totalItems = await this._repository.count({ where });
    const limit: number =
      paginator && paginator.limit > totalItems ? paginator.limit : totalItems;
    const totalPages: number = Math.trunc(totalItems / limit);
    const currentPage: number = paginator ? paginator.page : 1;
    const offset: number = (currentPage - 1) * limit;

    const builder = this._repository.createQueryBuilder();
    const items: T[] = await builder
      .where(this.filterQuery(builder, where))
      .getMany();
    /* const items: T[] = await this._repository.find({ */
    /*   where, */
    /*   skip: */
    /*     offset > totalItems ? totalItems - (totalItems % totalPages) : offset, */
    /*   take: limit, */
    /* }); */

    return {
      items,
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

  async update(where: IWhereInput, data: T | any): Promise<UpdateResult> {
    const updateQueryBuilder = this._repository
      .createQueryBuilder()
      .update()
      .set(data);
    return this.getWhere(where, updateQueryBuilder).execute();
  }

  private getWhere(
    where: IWhereInput,
    builder:
      | SelectQueryBuilder<T>
      | UpdateQueryBuilder<T>
      | DeleteQueryBuilder<T>,
  ): SelectQueryBuilder<T> | UpdateQueryBuilder<T> | DeleteQueryBuilder<T> {
    const data = {};
    for (const [key, value] of Object.entries(where)) {
      switch (true) {
        case /^AND$/.test(key):
          this.getWhere(value, builder);
          break;
        case /^.+_in$/.test(key):
          data[key.substr(0, key.length - 3)] = In(value);
          break;
        case /^.+_contains$/.test(key):
          data[key.substr(0, key.length - 9)] = Like(`%${value}%`);
          break;
        case /^.+_lte$/.test(key):
          data[key.substr(0, key.length - 9)] = LessThanOrEqual(value);
          break;
        case /^.+_lt$/.test(key):
          data[key.substr(0, key.length - 9)] = LessThan(value);
          break;
        case /^.+_gte$/.test(key):
          data[key.substr(0, key.length - 9)] = MoreThanOrEqual(value);
          break;
        case /^.+_gt$/.test(key):
          data[key.substr(0, key.length - 9)] = MoreThan(value);
          break;
        default:
          data[key] = value;
      }
    }

    return builder.where(data).andWhere(new Brackets(qb => {}));
  }

  private filterQuery(
    query:
      | SelectQueryBuilder<T>
      | DeleteQueryBuilder<T>
      | UpdateQueryBuilder<T>,
    where: Where,
  ) {
    if (!where) {
      return query;
    }

    return this.traverseTree(query, where);
  }

  private handleArgs(
    query: WhereExpression,
    where: Where,
    andOr: 'andWhere' | 'orWhere',
  ) {
    const whereArgs = Object.entries(where);

    whereArgs.map(whereArg => {
      const [fieldName, filters] = whereArg;
      const ops = Object.entries(filters);

      ops.map(parameters => {
        const [operation, value] = parameters;

        switch (operation) {
          case 'is': {
            query[andOr](`${fieldName} = :isvalue`, { isvalue: value });
            break;
          }
          case 'not': {
            query[andOr](`${fieldName} != :notvalue`, { notvalue: value });
            break;
          }
          case 'in': {
            query[andOr](`${fieldName} IN :invalue`, { invalue: value });
            break;
          }
          case 'not_in': {
            query[andOr](`${fieldName} NOT IN :notinvalue`, {
              notinvalue: value,
            });
            break;
          }
          case 'lt': {
            query[andOr](`${fieldName} < :ltvalue`, { ltvalue: value });
            break;
          }
          case 'lte': {
            query[andOr](`${fieldName} <= :ltevalue`, { ltevalue: value });
            break;
          }
          case 'gt': {
            query[andOr](`${fieldName} > :gtvalue`, { gtvalue: value });
            break;
          }
          case 'gte': {
            query[andOr](`${fieldName} >= :gtevalue`, { gtevalue: value });
            break;
          }
          case 'contains': {
            query[andOr](`${fieldName} ILIKE :convalue`, {
              convalue: `%${value}%`,
            });
            break;
          }
          case 'not_contains': {
            query[andOr](`${fieldName} NOT ILIKE :notconvalue`, {
              notconvalue: `%${value}%`,
            });
            break;
          }
          case 'starts_with': {
            query[andOr](`${fieldName} ILIKE :swvalue`, {
              swvalue: `${value}%`,
            });
            break;
          }
          case 'not_starts_with': {
            query[andOr](`${fieldName} NOT ILIKE :nswvalue`, {
              nswvalue: `${value}%`,
            });
            break;
          }
          case 'ends_with': {
            query[andOr](`${fieldName} ILIKE :ewvalue`, {
              ewvalue: `%${value}`,
            });
            break;
          }
          case 'not_ends_with': {
            query[andOr](`${fieldName} ILIKE :newvalue`, {
              newvalue: `%${value}`,
            });
            break;
          }
          default: {
            break;
          }
        }
      });
    });

    return query;
  }

  private traverseTree(
    query: WhereExpression,
    where: Where,
    upperOperator = Operator.AND,
  ) {
    Object.keys(where).forEach(key => {
      if (key === Operator.OR) {
        query = query.orWhere(this.buildNewBracket(where, upperOperator));
      } else if (key === Operator.AND) {
        query = query.andWhere(this.buildNewBracket(where, upperOperator));
      } else {
        query = this.handleArgs(
          query,
          where,
          upperOperator === Operator.AND ? 'andWhere' : 'orWhere',
        );
      }
    });

    return query;
  }

  private buildNewBracket(where: Where, operator: Operator) {
    return new Brackets(qb => {
      where[operator].map(queryArray => {
        this.traverseTree(qb, queryArray, operator);
      });
    });
  }
}

interface StrFieldOptions extends FieldOptions {
  contains?: string;
  not_contains?: string;
  starts_with?: string;
  not_starts_with?: string;
  ends_with?: string;
  not_ends_with?: string;
}

interface NumFieldOptions extends FieldOptions {
  lt?: number | Date;
  lte?: number | Date;
  gt?: number | Date;
  gte?: number | Date;
}

// interfaces
interface FieldOptions {
  is?: any;
  not?: any;
  in?: any;
  not_in?: any;
}

export interface Field {
  [key: string]: FieldOptions;
}

export type Where = {
  [K in Operator]?: (Where | Field)[];
};

export enum Operator {
  AND = 'AND',
  OR = 'OR',
}
