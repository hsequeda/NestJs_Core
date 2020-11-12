import { DeleteCommand } from 'src/core/commands/delete.command';
import { WhereBookInput } from 'src/books/dto/where-book.input';
import { Book } from 'src/books/entities/book.entity';

export class DeleteBookCommand extends DeleteCommand<Book> {
  constructor(where: WhereBookInput[]) {
    super(where);
  }
}
