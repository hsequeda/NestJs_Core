import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CompanyCodeExistError {
  constructor(message: string) {
    this.message = message;
  }
  @Field(() => String)
  message: string;
}
