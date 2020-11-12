import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { AppBaseEntity } from 'src/core/entity/base.entity';
import { Column, ManyToOne, Entity } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export enum BookType {
  HISTORY = 'history',
  SCIENCE = 'science',
  AVENTURE = 'aventure',
}

registerEnumType(BookType, { name: 'BookType' });

@ObjectType()
@Entity('book')
export class Book extends AppBaseEntity {
  @Field()
  @Column({ name: 'name', unique: true })
  name: string;
  @Column({ name: 'description', nullable: true })
  @Field(() => BookType)
  type: BookType;
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
