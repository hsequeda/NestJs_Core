import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyResp {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  code: string;
  @Field(() => Boolean)
  isActive: boolean;
  @Field(() => Int)
  version: number;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}
