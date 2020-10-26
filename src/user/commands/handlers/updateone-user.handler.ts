import { CommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repositories/user.repository';
import { UpdateOneUserCommand  } from '../impl/updateone-user.command';
import { User } from 'src/user/entities/user.entity';
import { UpdateOneHandler } from 'src/core/commands/handlers/updateone.handler';

@CommandHandler(UpdateOneUserCommand)
export class UpdateOneUserHandler extends UpdateOneHandler<User>{
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository)
  }
}
