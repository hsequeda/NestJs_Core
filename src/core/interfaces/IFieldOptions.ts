import { InputType, Field } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IFieldOptions<T> {
  is_null?: boolean;
  any?: T[];
  is?: T;
  not?: T;
  in?: T[];
  not_in?: T[];
}

export function getFieldOptions<T>(classRef: Type<T>): any {
  @InputType({ isAbstract: true })
  abstract class FieldOptions implements IFieldOptions<T> {
    @Field(() => Boolean, { nullable: true })
    is_null?: boolean;
    @Field(() => classRef, { nullable: true })
    any?: T[];
    @Field(() => classRef, { nullable: true })
    is?: T;
    @Field(() => classRef, { nullable: true })
    not?: T;
    @Field(() => classRef, { nullable: true })
    in?: T[];
    @Field(() => classRef, { nullable: true })
    not_in?: T[];
  }
  return FieldOptions;
}

export enum FieldOptionsKeys {
  IS_NULL = 'is_null',
  ANY = 'any',
  IS = 'is',
  NOT = 'not',
  IN = 'in',
  NOT_IN = 'not_in',
}
