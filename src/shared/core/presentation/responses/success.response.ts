import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Response {
  constructor() {
    this.success = true;
  }
  @Field(() => Boolean)
  success: boolean;
}
