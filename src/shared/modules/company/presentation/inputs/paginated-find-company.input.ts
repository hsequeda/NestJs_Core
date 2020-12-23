import {
  PaginatedFindCompanyDto,
  CompanyWhereDto,
} from '../../application/dtos/paginated-find-company.dto';
import { OrderCompanyEnum } from '../../domain/interfaces/IRepository';
import { Field, registerEnumType, InputType, ArgsType } from '@nestjs/graphql';
import { PageParamsInput } from 'src/shared/core/presentation/inputs/paginator-params.input';
import { IdFieldOptions } from 'src/shared/core/presentation/inputs/id.input';
import { StringFieldOptions } from 'src/shared/core/presentation/inputs/string.input';

registerEnumType(OrderCompanyEnum, { name: 'OrderCompanyEnum' });

@InputType()
export class CompanyWhereInput implements CompanyWhereDto {
  @Field(() => IdFieldOptions, { nullable: true })
  id?: IdFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  code?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  name?: StringFieldOptions;
}

@ArgsType()
export class PaginatedFindCompanyInput implements PaginatedFindCompanyDto {
  @Field(() => PageParamsInput)
  pageParams: PageParamsInput;
  @Field(() => CompanyWhereInput, { nullable: true })
  where?: CompanyWhereInput;
  @Field(() => OrderCompanyEnum, { nullable: true })
  order?: OrderCompanyEnum;
  @Field(() => IdFieldOptions, { nullable: true })
  id?: IdFieldOptions;
}
