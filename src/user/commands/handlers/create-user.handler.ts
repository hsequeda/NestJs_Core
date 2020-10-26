import { CommandHandler, EventPublisher, } from '@nestjs/cqrs';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { CreateHandler } from 'src/core/commands/handlers/create.handler';
import { User } from 'src/user/entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends CreateHandler<User>{
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository)
  }

}
