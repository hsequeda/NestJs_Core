import { UserInput } from 'src/user/input/user.input';
import { CreateCommand } from 'src/core/commands/impl/create.command';
import { BaseEntity } from 'src/core/entity/base.entity';

export class CreateUserCommand extends CreateCommand {
  constructor(public input: UserInput | BaseEntity) {
    super(input);
  }
}
