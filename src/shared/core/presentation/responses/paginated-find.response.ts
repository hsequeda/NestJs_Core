import { PaginatedFindResult } from '../../PaginatedFindResult';
import { ObjectType, Int, Field } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';

export default function getGenericPaginatedFindResult<T>(
  Type: ClassType<T>,
): any {
  @ObjectType({ isAbstract: true })
  abstract class GenericPaginatedFindResponse
    implements PaginatedFindResult<T> {
    @Field(() => Type)
    items: T[];
    @Field(() => Int)
    limit: number;
    @Field(() => Int)
    currentPage: number;
    @Field(() => Int)
    totalPages: number;
  }
  return GenericPaginatedFindResponse;
}
