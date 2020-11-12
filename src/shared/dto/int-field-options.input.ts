import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IBetween,
  IQuantitativeFieldOptions,
} from 'src/core/interfaces/IQuantitativeFieldOptions';

@InputType()
export class BetweenInt implements IBetween<number> {
  @Field(() => Int)
  from: number;
  @Field(() => Int)
  to: number;
}

/**
 * Options to filter by a Int object. You only can use a field at a time.
 *
 * @export
 * @class IntFieldOptions
 * @implements {IQuantitativeFieldOptions<number>}
 */
@InputType({
  description:
    'Options to filter by a Int object. You only can use a field at a time.',
})
export class IntFieldOptions implements IQuantitativeFieldOptions<number> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field(() => [Int], { nullable: 'itemsAndList' })
  any: number[];
  @Field(() => Int, { nullable: true })
  is?: number;
  @Field(() => Int, { nullable: true })
  not?: number;
  @Field(() => [Int], { nullable: 'itemsAndList' })
  in?: number[];
  @Field(() => [Int], { nullable: 'itemsAndList' })
  notIn?: number[];
  @Field(() => Int, { nullable: true })
  lt?: number;
  @Field(() => Int, { nullable: true })
  lte?: number;
  @Field(() => Int, { nullable: true })
  gt?: number;
  @Field(() => Int, { nullable: true })
  gte?: number;
  @Field(() => BetweenInt, { nullable: true })
  between?: BetweenInt;
}
