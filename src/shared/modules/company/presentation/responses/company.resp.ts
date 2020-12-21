import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyResp {
  constructor(
    id: string,
    name: string,
    code: string,
    isActive: boolean,
    version: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.isActive = isActive;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
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
