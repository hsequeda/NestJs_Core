import { AppBaseEntity } from 'src/core/entity/base.entity';
import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends AppBaseEntity {
  @Column({ unique: true, nullable: false })
  @Field()
  name: string;
  @HideField()
  email: string;
}
