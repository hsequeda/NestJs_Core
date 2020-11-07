import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class AppBaseEntity extends AggregateRoot {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Field(() => Date, { description: 'Object creation date' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
  @Field(() => Date, { description: 'Object update date' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
