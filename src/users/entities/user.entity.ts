import { ObjectType, Field } from '@nestjs/graphql';
import { AppBaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';

@ObjectType()
@Entity('user')
export class User extends AppBaseEntity {
  @Field(() => String)
  @Column({ name: 'username', unique: true })
  username: string;
  @Field(() => String)
  @Column({ name: 'email', unique: true })
  email: string;
  @Field(() => Boolean)
  @Column({ name: 'active', default: true })
  active: boolean;
  @OneToMany(
    () => Book,
    book => book.user,
    { cascade: true },
  )
  @Field(() => [Book], { nullable: 'itemsAndList' })
  books: Book[];
}
