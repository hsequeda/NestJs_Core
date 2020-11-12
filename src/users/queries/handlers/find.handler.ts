import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserQuery } from '../impl/find.query';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { PayloadUser } from 'src/users/dto/payload-user.dto';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(private readonly _userRepository: UsersRepository) {}
  async execute(query: FindUserQuery): Promise<PayloadUser> {
    return this._userRepository.find(query.where, query.paginatedOptions);
  }
}
