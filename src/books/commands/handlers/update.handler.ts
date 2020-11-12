import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BooksRepository } from 'src/books/repositories/books.repository';
import { UpdateBookCommand } from '../impl/update.command';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(private readonly _bookRepository: BooksRepository) {}
  execute(command: UpdateBookCommand): Promise<any> {
    return this._bookRepository.updateMany(command.where, command.input);
  }
}
