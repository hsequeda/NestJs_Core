import { UpdateCommand } from 'src/core/commands/update.command';
import { Book } from 'src/books/entities/book.entity';
import { WhereBookInput } from 'src/books/dto/where-book.input';
import { UpdateBookInput } from 'src/books/dto/update-book.input';

export class UpdateBookCommand extends UpdateCommand<Book> {
  constructor(where: WhereBookInput[], data: UpdateBookInput) {
    super(where, data);
  }
}
