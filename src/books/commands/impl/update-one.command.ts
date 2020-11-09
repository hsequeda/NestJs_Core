import { UpdateOneCommand } from 'src/core/commands/update-one.command';
import { Book } from 'src/books/entities/book.entity';
import { WhereUniqueBookInput } from 'src/books/dto/where-unique-book.input';
import { UpdateOneBookInput } from 'src/books/dto/updateone-book.input';

export class UpdateOneBookCommand extends UpdateOneCommand<Book> {
  constructor(where: WhereUniqueBookInput, data: UpdateOneBookInput) {
    super(where, data);
  }
}
