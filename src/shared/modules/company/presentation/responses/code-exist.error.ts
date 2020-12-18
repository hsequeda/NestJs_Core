import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CodeExistError {
  @Field(() => String)
  message: string;
}
