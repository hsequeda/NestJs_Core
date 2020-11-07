import { IFieldOptions } from './IFieldOptions';
import { Type } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';

export interface IQualitativeFieldOptions<T extends String>
  extends IFieldOptions<T> {
  is_null?: boolean;
  any?: T[];
  is?: T;
  not?: T;
  in?: T[];
  not_in?: T[];
  contains?: T;
  not_contains?: T;
  starts_with?: T;
  not_starts_with?: T;
  ends_with?: T;
  not_ends_with?: T;
}

export function getQualitativeFieldOptions<T extends String>(
  classRef: Type<T>,
): any {
  @InputType({ isAbstract: true })
  abstract class FieldOptions implements IQualitativeFieldOptions<T> {
    @Field(() => Boolean, { nullable: true })
    is_null?: boolean;
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    any?: T[];
    @Field(() => classRef, { nullable: true })
    is?: T;
    @Field(() => classRef, { nullable: true })
    not?: T;
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    in?: T[];
    @Field(() => [classRef], { nullable: 'itemsAndList' })
    not_in?: T[];
    @Field(() => classRef, { nullable: true })
    contains?: T;
    @Field(() => classRef, { nullable: true })
    not_contains?: T;
    @Field(() => classRef, { nullable: true })
    starts_with?: T;
    @Field(() => classRef, { nullable: true })
    not_starts_with?: T;
    @Field(() => classRef, { nullable: true })
    ends_with?: T;
    @Field(() => classRef, { nullable: true })
    not_ends_with?: T;
  }
  return FieldOptions;
}
