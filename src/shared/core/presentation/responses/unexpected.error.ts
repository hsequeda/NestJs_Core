import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UnexpectedError {
  @Field(() => String)
  message: string;
}
