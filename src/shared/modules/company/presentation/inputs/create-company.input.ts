import { InputType, Field } from '@nestjs/graphql';
import { CreateCompanyDto } from '../../application/dtos/create-company.dto';

@InputType()
export class CreateCompanyInput implements CreateCompanyDto {
  @Field(() => String)
  name: string;
  @Field(() => String)
  code: string;
}
