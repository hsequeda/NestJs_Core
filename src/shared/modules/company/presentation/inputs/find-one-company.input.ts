import { InputType, Field, ID } from '@nestjs/graphql';
import { FindOneCompanyDto } from '../../application/dtos/find-one-company.dto';

@InputType()
export class FindOneCompanyInput implements FindOneCompanyDto {
  @Field(() => ID)
  id: string | number;
}
