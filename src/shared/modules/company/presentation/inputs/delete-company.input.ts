import { InputType, Field, Int } from '@nestjs/graphql';
import { DeleteCompanyDto } from '../../application/dtos/delete-company.dto';

@InputType()
export class DeleteCompanyInput implements DeleteCompanyDto {
  @Field(() => String)
  id: string;
  @Field(() => Int)
  currentVersion: number;
}
