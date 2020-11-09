import { CreateCommand } from 'src/core/commands/create.command';
import { CreateUserInput } from 'src/users/dto/create-user.input';

export class CreateUserCommand extends CreateCommand<CreateUserInput> {
  constructor(data: CreateUserInput) {
    super(data);
  }
}
