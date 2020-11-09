import { UpdateCommand } from 'src/core/commands/update.command';
import { User } from 'src/users/entities/user.entity';
import { WhereUserInput } from 'src/users/dto/where-user.input';
import { UpdateUserInput } from 'src/users/dto/update-user.input';

export class UpdateUserCommand extends UpdateCommand<User> {
  constructor(where: WhereUserInput[], data: UpdateUserInput) {
    super(where, data);
  }
}
