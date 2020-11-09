import { AggregateRoot } from '@nestjs/cqrs';
import { IQualitativeFieldOptions } from './IQualitativeFieldOptions';
import { IQuantitativeFieldOptions } from './IQuantitativeFieldOptions';
import { IFieldOptions } from './IFieldOptions';
import { AppBaseEntity } from '../entity/base.entity';

export type OR<T extends AppBaseEntity> = IWhere<T>[];

export type IWhere<T extends AppBaseEntity> = {
  [P in keyof Omit<T, keyof AggregateRoot>]?: T[P] extends string
    ? IQualitativeFieldOptions<T[P]>
    : T[P] extends number | Date
    ? IQuantitativeFieldOptions<T[P]>
    : IFieldOptions<T[P]>;
};
