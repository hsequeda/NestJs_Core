import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { DeleteUserCommand } from '../impl/delete.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly _userRepository: UsersRepository) {}
  execute(command: DeleteUserCommand): Promise<any> {
    return this._userRepository.deleteMany(command.where);
  }
}
