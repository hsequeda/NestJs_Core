import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { User } from '../entities/user.entity';

import { BaseService } from 'src/core/service/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly cBus: CommandBus,
    private readonly qBus: QueryBus,
    private readonly eBus: EventBus,
  ) {
    super(cBus, qBus, eBus);
  }
}
