import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ValidationError {
  @Field(() => String)
  message: string;
}
