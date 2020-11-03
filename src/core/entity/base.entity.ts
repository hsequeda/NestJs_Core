import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@ObjectType({ isAbstract: true })
export class AppBaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
}
