import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Response {
  @Field(() => Boolean)
  success: boolean;
}
