import { ObjectType, Field } from '@nestjs/graphql';
import { AppBaseEntity } from 'src/core/entity/base.entity';
import { Column, ManyToOne, Entity } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity('book')
export class Book extends AppBaseEntity {
  @Field()
  @Column({ name: 'name', unique: true })
  name: string;
  @Field()
  @Column({ name: 'description', nullable: true })
  description: string;
  @ManyToOne(
    () => User,
    user => user.books,
  )
  @Field(() => User, { nullable: true })
  user: User;
}
