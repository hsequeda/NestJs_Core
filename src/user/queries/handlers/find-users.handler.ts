import { QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from '../impl/find-users.query';
import { FindHandler } from 'src/core/queries/handlers/find.handler';
import { User } from '../../entities/user.entity';
import { UserOrm } from '../../orm/user.orm';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler extends FindHandler<User> {
  constructor(private readonly _userOrm: UserOrm) {
    super(_userOrm);
  }
}
