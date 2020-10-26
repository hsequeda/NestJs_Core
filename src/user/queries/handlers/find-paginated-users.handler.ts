import { QueryHandler } from '@nestjs/cqrs';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { FindPaginatedHandler } from '../../../core/queries/handlers/find-paginated.handler';
import { FindPaginatedUsersQuery } from '../impl/find-paginated-users.query';

@QueryHandler(FindPaginatedUsersQuery)
export class FindPaginatedUsersHandler extends FindPaginatedHandler<User>{
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}


