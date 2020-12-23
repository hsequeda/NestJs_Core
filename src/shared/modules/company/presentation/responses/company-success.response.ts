import { CompanyResp } from './company.resp';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanySuccess {
  constructor(data: CompanyResp) {
    this.company = data;
  }
  @Field(() => CompanyResp)
  company: CompanyResp;
}
