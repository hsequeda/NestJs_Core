import { Field, ID, InputType } from '@nestjs/graphql';
import { FieldOptions } from 'src/shared/modules/data-access/types/IFieldOptions';

@InputType({
  description:
    'Options to filter by a id object. You only can use a field at a time.',
})
export class IdFieldOptions implements FieldOptions<string | number> {
  @Field(() => ID, { nullable: true })
  isNull?: boolean;
  @Field(() => [ID], { nullable: 'itemsAndList' })
  any?: string[] | number[];
  @Field(() => ID, { nullable: true })
  is?: string | number;
  @Field(() => ID, { nullable: true })
  not?: string | number;
  @Field(() => [ID], { nullable: 'itemsAndList' })
  in?: string[] | number[];
  @Field(() => [ID], { nullable: 'itemsAndList' })
  notIn?: string[] | number[];
}
