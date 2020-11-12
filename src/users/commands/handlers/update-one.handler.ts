import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UpdateOneUserCommand } from '../impl/update-one.command';

@CommandHandler(UpdateOneUserCommand)
export class UpdateOneUserHandler
  implements ICommandHandler<UpdateOneUserCommand> {
  constructor(private readonly _userRepository: UsersRepository) {}
  execute(command: UpdateOneUserCommand): Promise<any> {
    return this._userRepository.updateOne(command.where, command.input);
  }
}
