import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { User } from './entities/user.entity';
import { UserOrm } from './orm/user.orm';
import { UserService } from './services/user.service';
import { UserResolver } from './resolver/user.resolver';
import { NotificationModule } from 'src/notification/notification.module';
import { UserQueryHandlers } from './queries/handlers';
import { UserCommandHandlers } from './commands/handlers';
import { UserEventHandlers } from 'src/user/events/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLoggerModule } from '../logger/app-logger.module';

@Module({
  imports: [CqrsModule, AppLoggerModule, TypeOrmModule.forFeature([User])],
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
