import { QueryHandler } from '@nestjs/cqrs';
import { FindOneUserQuery } from '../impl/findone-user.query';
import { FindOneHandler } from 'src/core/queries/handlers/findone.handler';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler extends FindOneHandler<User>{
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}


