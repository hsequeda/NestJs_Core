import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmRepository } from 'src/database/typeorm/repository.abstract';
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends AbstractTypeOrmRepository<User> {
  constructor(@InjectRepository(User) _userRepository: Repository<User>) {
    super(_userRepository);
  }
}
