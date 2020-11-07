import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IPayloadResult } from 'src/core/interfaces/IPayloadResult';
import { User } from '../entities/user.entity';

@ObjectType()
export class PayloadUser implements IPayloadResult<User> {
  @Field(() => [User], { nullable: 'itemsAndList' })
  items: User[];
  @Field(() => Int)
  limit: number;
  @Field(() => Int)
  currentPage: number;
  @Field(() => Int)
  totalItems: number;
  @Field(() => Int)
  totalPages: number;
}
