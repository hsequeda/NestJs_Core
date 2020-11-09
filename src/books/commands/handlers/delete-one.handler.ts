import { DeleteOneBookCommand } from '../impl/delete-one.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BooksRepository } from 'src/books/repositories/books.repository';

@CommandHandler(DeleteOneBookCommand)
export class DeleteOneBookHandler
  implements ICommandHandler<DeleteOneBookCommand> {
  constructor(private readonly _bookRepository: BooksRepository) {}
  execute(command: DeleteOneBookCommand): Promise<any> {
    return this._bookRepository.deleteOne(command.where);
  }
}
