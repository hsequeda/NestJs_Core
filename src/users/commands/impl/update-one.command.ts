import { UpdateOneCommand } from 'src/core/commands/update-one.command';
import { User } from 'src/users/entities/user.entity';
import { WhereUniqueUserInput } from 'src/users/dto/where-unique-user.input';
import { UpdateOneUserInput } from 'src/users/dto/updateone-user.input';

export class UpdateOneUserCommand extends UpdateOneCommand<User> {
  constructor(where: WhereUniqueUserInput, data: UpdateOneUserInput) {
    super(where, data);
  }
}
