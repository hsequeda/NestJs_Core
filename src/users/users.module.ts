import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserCommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRepository } from './repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserQueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    UsersRepository,
    ...UserCommandHandlers,
    ...UserQueryHandlers,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
