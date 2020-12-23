import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { UpdateCompanyDto } from '../../application/dtos/update-company.dto';

@InputType()
export class UpdateCompanyInput implements UpdateCompanyDto {
  @Field(() => ID)
  id: string;
  @Field(() => Int)
  currentVersion: number;
  @Field(() => String)
  code?: string;
  @Field(() => String)
  name?: string;
}
