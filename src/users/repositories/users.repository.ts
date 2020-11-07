import { BaseOrm } from 'src/core/orm/base.orm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends BaseOrm<User> {
  constructor(@InjectRepository(User) _userRepository: Repository<User>) {
    super(_userRepository);
  }
}
