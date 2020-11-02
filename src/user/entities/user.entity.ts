import { BaseEntity } from 'src/core/entity/base.entity';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Column() email: string;
  @Column() firstname: string;
  @Column() lastname: string;
}
