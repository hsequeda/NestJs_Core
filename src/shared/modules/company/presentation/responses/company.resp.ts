import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CompanyDto } from '../../application/dtos/company.dto';

@ObjectType('Company')
export class CompanyResp implements CompanyDto {
  constructor(params: CompanyDto) {
    this.id = params.id;
    this.name = params.name;
    this.code = params.code;
    this.isActive = params.isActive;
    this.version = params.version;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
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
