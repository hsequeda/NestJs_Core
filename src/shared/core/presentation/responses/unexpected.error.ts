import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UnexpectedError {
  constructor(message: string, error: any) {
    this.message = message;
    this.error = error.message;
  }

  @Field(() => String)
  message: string;
  @Field(() => String)
  error: string;
}
