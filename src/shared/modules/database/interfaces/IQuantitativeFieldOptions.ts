import { IFieldOptions } from './IFieldOptions';

/**
 * Represent a object used in a 'where between' sentence.
 *
 * @export
 * @interface IBetween
 * @template T
 */
export interface IBetween<T extends number | Date> {
  from: T;
  to: T;
}

/**
 * Interface to represent a quantitative field to use in 'where' statement in findAll queries.
 *
 * @export
 * @interface IQuantitativeFieldOptions
 * @extends {IFieldOptions<T>}
 * @template T
 */
export interface IQuantitativeFieldOptions<T extends number | Date>
  extends IFieldOptions<T> {
  lt?: T;
  lte?: T;
  gt?: T;
  gte?: T;
  between?: IBetween<T>;
}

export enum QuantitativeFieldOptionsKeys {
  LT = 'lt',
  LTE = 'lte',
  GT = 'gt',
  GTE = 'gte',
  BETWEEN = 'between',
}
