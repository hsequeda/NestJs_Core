import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AppBaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends AppBaseEntity {
  @Field(() => String)
  @Column({ unique: true })
  username: string;
  @Field(() => String)
  @Column({ unique: true })
  email: string;
  @Field(() => Boolean)
  @Column({ default: true })
  active: boolean;
}
