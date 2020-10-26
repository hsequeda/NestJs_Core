import { QueryHandler } from '@nestjs/cqrs';
import { CountUsersQuery } from '../impl/count-users.query';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { CountHandler } from 'src/core/queries/handlers/count.handler';

@QueryHandler(CountUsersQuery)
export class CountUsersHandler extends CountHandler<User>{
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}


