import { IQualitativeFieldOptions } from './IQualitativeFieldOptions';
import { IQuantitativeFieldOptions } from './IQuantitativeFieldOptions';
import { IFieldOptions } from './IFieldOptions';

export type OR<T> = IWhere<T>[];

export type IWhere<T> = {
  [P in keyof T]?: T[P] extends number | Date
    ? IQuantitativeFieldOptions<T[P]>
    : T[P] extends string
    ? IQualitativeFieldOptions<T[P]>
    : IFieldOptions<T[P]>;
};
