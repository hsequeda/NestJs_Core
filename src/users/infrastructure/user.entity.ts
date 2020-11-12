import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { PersistentEntity } from 'src/database/typeorm/base.entity';

@ObjectType()
@Entity('user')
export class User extends PersistentEntity {
  @Field(() => String)
  @Column({ type: 'varchar2', name: 'username', unique: true })
  username: string;
  @Field(() => String)
  @Column({ type: 'varchar2', name: 'email', unique: true })
  email: string;
  @Field(() => Boolean)
  @Column({ type: 'boolean', name: 'active', default: true })
  active: boolean;
  @OneToMany(
    () => Book,
    book => book.user,
    { cascade: true },
  )
  @Field(() => [Book], { nullable: 'itemsAndList' })
  books: Book[];
}
