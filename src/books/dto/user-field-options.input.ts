import { InputType, Field, ID } from '@nestjs/graphql';
import { IFieldOptions } from 'src/core/interfaces/IFieldOptions';

@InputType()
export class UserFieldOptions implements IFieldOptions<string> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field(() => [ID], { nullable: 'itemsAndList' })
  any?: string[];
  @Field(() => ID, { nullable: true })
  is?: string;
  @Field(() => ID, { nullable: true })
  not?: string;
  @Field(() => [ID], { nullable: 'itemsAndList' })
  in?: string[];
  @Field(() => [ID], { nullable: 'itemsAndList' })
  notIn?: string[];
}
