import { CompanyResp } from './company.resp';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreatedCompanySubsResponse {
  @Field(() => CompanyResp)
  company: CompanyResp;
}
