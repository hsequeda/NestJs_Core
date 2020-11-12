import { DeleteOneUserCommand } from '../impl/delete-one.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';

@CommandHandler(DeleteOneUserCommand)
export class DeleteOneUserHandler
  implements ICommandHandler<DeleteOneUserCommand> {
  constructor(private readonly _userRepository: UsersRepository) {}
  execute(command: DeleteOneUserCommand): Promise<any> {
    return this._userRepository.deleteOne(command.where);
  }
}
