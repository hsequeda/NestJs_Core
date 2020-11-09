import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UpdateUserCommand } from '../impl/update.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly _userRepository: UsersRepository) {}
  execute(command: UpdateUserCommand): Promise<any> {
    return this._userRepository.updateMany(command.where, command.input);
  }
}
