import { InputType, Field } from '@nestjs/graphql';
import { WhereUniqueUserInput } from 'src/users/dto/where-unique-user.input';
import { BaseInput } from 'src/core/input/base.input';

@InputType()
export class CreateBookInput extends BaseInput {
  @Field(() => WhereUniqueUserInput)
  user: WhereUniqueUserInput;
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: true })
  description: string;
}

