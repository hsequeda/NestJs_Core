import { IFieldOptions } from './IFieldOptions';

/**
 * Interface to represent a qualitative field to use in 'where' statement in findAll queries.
 *
 * @export
 * @interface IQualitativeFieldOptions
 * @extends {IFieldOptions<T>}
 * @template T
 */
export interface IQualitativeFieldOptions<T> extends IFieldOptions<T> {
  contains?: T;
  notContains?: T;
  startsWith?: T;
  notStartsWith?: T;
  endsWith?: T;
  notEndsWith?: T;
}

export enum QualitativeFieldOptionsKeys {
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  STARTS_WITH = 'startsWith',
  NOT_STARTS_WITH = 'notStartsWith',
  ENDS_WITH = 'endsWith',
  NOT_ENDS_WITH = 'notEndsWith',
}
