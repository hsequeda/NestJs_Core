import { Field, Int, InputType } from '@nestjs/graphql';
@InputType()
export abstract class PaginatorParams {
  @Field(() => Int) page?: number = 1;
  @Field(() => Int) limit?: number = 10;
}
