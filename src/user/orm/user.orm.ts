import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseOrm } from 'src/core/orm/base.orm';
import { User } from '../entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserOrm extends BaseOrm<User> {
  constructor(@InjectRepository(User) _userRepository: Repository<User>) {
    super(_userRepository);
  }
}
