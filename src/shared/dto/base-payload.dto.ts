import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';
import { IPayloadResult } from 'src/core/interfaces/IPayloadResult';

export default function PayloadData<T>(Type: ClassType<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class BasePayload implements IPayloadResult<T> {
    @Field(() => [Type]) items: T[];
    @Field(() => Int) limit: number;
    @Field(() => Int) currentPage: number;
    @Field(() => Int) totalItems: number;
    @Field(() => Int) totalPages: number;
  }
  return BasePayload;
}
