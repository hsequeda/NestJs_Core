import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { User } from './entities/user.entity';
import { UserOrm } from './orm/user.orm';
import { UserService } from './services/user.service';
import { UserResolver } from './resolver/user.resolver';
import { UserQueryHandlers } from './queries/handlers';
import { UserCommandHandlers } from './commands/handlers';
import { UserEventHandlers } from 'src/user/events/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserOrm,
    UserResolver,
    ...UserQueryHandlers,
    ...UserCommandHandlers,
    ...UserEventHandlers,
  ],
  exports: [UserService, UserOrm],
})
export class UserModule {}
