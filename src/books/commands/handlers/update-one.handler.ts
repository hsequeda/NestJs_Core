import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BooksRepository } from 'src/books/repositories/books.repository';
import { UpdateOneBookCommand } from '../impl/update-one.command';

@CommandHandler(UpdateOneBookCommand)
export class UpdateOneBookHandler
  implements ICommandHandler<UpdateOneBookCommand> {
  constructor(private readonly _bookRepository: BooksRepository) {}
  execute(command: UpdateOneBookCommand): Promise<any> {
    return this._bookRepository.updateOne(command.where, command.input);
  }
}
