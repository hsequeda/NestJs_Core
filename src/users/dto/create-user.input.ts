import { InputType, Field } from '@nestjs/graphql';
import { BaseInput } from 'src/core/input/base.input';

@InputType()
export class CreateUserInput extends BaseInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
}
