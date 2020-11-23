import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';
import { IPayloadResult } from '../modules/database/interfaces/IPayloadResult';

/**
 * Returns a payload for the class passed by parameter.
 *
 * @export
 * @template T
 * @param {ClassType<T>} Type
 * @returns  {*}
 */
export default function getGenericPayload<T>(Type: ClassType<T>): any {
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
