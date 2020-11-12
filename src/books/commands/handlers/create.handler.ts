import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from '../impl/create.command';
import { Book } from 'src/books/entities/book.entity';
import { UserInputError } from 'apollo-server-express';
import { BooksRepository } from 'src/books/repositories/books.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { User } from 'src/users/entities/user.entity';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(
    private _userRepository: UsersRepository,
    private _bookRepository: BooksRepository,
  ) {}
  async execute(command: CreateBookCommand): Promise<Book> {
    const user: User = await this._userRepository.findOne(command.data.user);
    if (!user) {
      throw new UserInputError('User not found');
    }
    return this._bookRepository.create({
      name: command.data.name,
      description: command.data.description,
      user: user,
    });
  }
}
