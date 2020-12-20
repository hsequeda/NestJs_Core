import { InputType, Field, Int } from '@nestjs/graphql';

/**
 * Pagination configuration for findAll queries.
 *
 * @export
 * @abstract
 * @class PaginatorParams
 */
@InputType({ description: 'Pagination configuration for findAll queries.' })
export abstract class PaginatorParams {
  @Field(() => Int) page?: number = 1;
  @Field(() => Int) limit?: number = 10;
}
