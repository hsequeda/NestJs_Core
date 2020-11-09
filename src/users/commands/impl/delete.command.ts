import { DeleteCommand } from 'src/core/commands/delete.command';
import { WhereUserInput } from 'src/users/dto/where-user.input';
import { User } from 'src/users/entities/user.entity';

export class DeleteUserCommand extends DeleteCommand<User> {
  constructor(where: WhereUserInput[]) {
    super(where);
  }
}
