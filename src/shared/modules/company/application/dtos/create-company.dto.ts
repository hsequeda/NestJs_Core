import { InputType, Field } from '@nestjs/graphql';

export interface CreateCompanyDto {
  name: string;
  code: string;
}

@InputType()
export class CreateCompanyInput implements CreateCompanyDto {
  @Field(() => String)
  name: string;
  @Field(() => String)
  code: string;
}

