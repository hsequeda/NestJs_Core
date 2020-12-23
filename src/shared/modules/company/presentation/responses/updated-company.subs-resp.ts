import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UpdatedCompanySubsResponse {
  @Field(() => String)
  id: string;
  @Field(() => Int)
  version: number;
  @Field(() => String, { nullable: true })
  code?: string;
  @Field(() => String, { nullable: true })
  name?: string;
}
