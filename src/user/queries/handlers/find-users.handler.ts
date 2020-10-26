import { QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from '../impl/find-users.query';
import { FindHandler } from 'src/core/queries/handlers/find.handler';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler extends FindHandler<User>{
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}


