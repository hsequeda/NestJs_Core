import { IFieldOptions } from './IFieldOptions';
import { Type } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';

// tslint:disable-next-line
// eslint-disable-next-line
export interface IBetween<T extends Number | Date> {
  from: T;
  to: T;
}

// tslint:disable-next-line
// eslint-disable-next-line
export interface IQuantitativeFieldOptions<T extends Number | Date>
  extends IFieldOptions<T> {
  is_null?: boolean;
  any: T[];
  is?: T;
  not?: T;
  in?: T[];
  not_in?: T[];
  lt?: T;
  lte?: T;
  gt?: T;
  gte?: T;
  between?: IBetween<T>;
}

// tslint:disable-next-line
// eslint-disable-next-line
export function getQuantitativeFieldOptions<T extends Number | Date>(
  classRef: Type<T>,
): any {
  @InputType(`Between${classRef.name}`)
  abstract class Between implements IBetween<T> {
    @Field(() => classRef)
    from: T;
    @Field(() => classRef)
    to: T;
  }

  @InputType({ isAbstract: true })
  abstract class QuantitativeFieldOptions
    implements IQuantitativeFieldOptions<T> {
    @Field(() => Boolean, { nullable: true })
    is_null?: boolean;
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    any: T[];
    @Field(() => classRef, { nullable: true })
    is?: T;
    @Field(() => classRef, { nullable: true })
    not?: T;
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    in?: T[];
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    not_in?: T[];
    @Field(() => classRef, { nullable: true })
    lt?: T;
    @Field(() => classRef, { nullable: true })
    lte?: T;
    @Field(() => classRef, { nullable: true })
    gt?: T;
    @Field(() => classRef, { nullable: true })
    gte?: T;
    @Field(() => Between, { nullable: true })
    between?: Between;
  }

  return QuantitativeFieldOptions;
}

export enum QuantitativeFieldOptionsKeys {
  LT = 'lt',
  LTE = 'lte',
  GT = 'gt',
  GTE = 'gte',
  BETWEEN = 'between',
}
