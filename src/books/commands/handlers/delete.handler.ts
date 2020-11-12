import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BooksRepository } from 'src/books/repositories/books.repository';
import { DeleteBookCommand } from '../impl/delete.command';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  constructor(private readonly _bookRepository: BooksRepository) {}
  execute(command: DeleteBookCommand): Promise<any> {
    return this._bookRepository.deleteMany(command.where);
  }
}
