import { InputType, PartialType, Field } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateOneUserInput extends PartialType(CreateUserInput) {
  @Field(() => Boolean)
  active?: boolean;
}
