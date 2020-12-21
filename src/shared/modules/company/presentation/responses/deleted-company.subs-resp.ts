import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletedCompanySubsResponse {
  @Field(() => String)
  id: string;
  @Field(() => Int)
  version: number;
}
