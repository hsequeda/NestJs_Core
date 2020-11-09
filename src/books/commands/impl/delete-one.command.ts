import { WhereUniqueBookInput } from 'src/books/dto/where-unique-book.input';
import { DeleteOneCommand } from 'src/core/commands/delete-one.command';
import { Book } from 'src/books/entities/book.entity';

export class DeleteOneBookCommand extends DeleteOneCommand<Book> {
  constructor(where: WhereUniqueBookInput) {
    super(where);
  }
}
