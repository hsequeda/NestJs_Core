import { prop } from '@typegoose/typegoose';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseEntity {
  _id?: string;
  @prop() createdAt?: Date;
  @prop() updatedAt?: Date;
}
