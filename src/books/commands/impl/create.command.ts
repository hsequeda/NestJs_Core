import { CreateCommand } from 'src/core/commands/create.command';
import { CreateBookInput } from 'src/books/dto/create-book.input';

export class CreateBookCommand extends CreateCommand<CreateBookInput> {
  constructor(data: CreateBookInput) {
    super(data);
  }
}
