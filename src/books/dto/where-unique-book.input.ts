import { Book } from '../entities/book.entity';
import { IWhereUnique } from 'src/core/interfaces/IWhereUniqueInput';
import { Field } from '@nestjs/graphql';

export class WhereUniqueBookInput implements IWhereUnique<Book> {
  @Field()
  id: string;
  @Field()
  name: string;
}
