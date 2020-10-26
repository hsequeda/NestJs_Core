import { UpdateOneCommand } from 'src/core/commands/impl/update-one.command';
import { UserUpdateInput } from '../../input/user-update.input';
import { User } from '../../entities/user.entity';

export class UpdateOneUserCommand extends UpdateOneCommand {
  constructor(filter: any, public input: UserUpdateInput | User, upsert: boolean = false) {
    super(filter, input, upsert);
  }
}
