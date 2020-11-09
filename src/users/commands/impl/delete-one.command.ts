import { WhereUniqueUserInput } from 'src/users/dto/where-unique-user.input';
import { DeleteOneCommand } from 'src/core/commands/delete-one.command';
import { User } from 'src/users/entities/user.entity';

export class DeleteOneUserCommand extends DeleteOneCommand<User> {
  constructor(where: WhereUniqueUserInput) {
    super(where);
  }
}
