import { CommandHandler } from '@nestjs/cqrs';
import { UserOrm } from '../../orm/user.orm';
import { CreateUserCommand } from '../impl/create-user.command';
import { CreateHandler } from 'src/core/commands/handlers/create.handler';
import { User } from 'src/user/entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends CreateHandler<User> {
  constructor(private readonly _userOrm: UserOrm) {
    super(_userOrm);
  }
}
