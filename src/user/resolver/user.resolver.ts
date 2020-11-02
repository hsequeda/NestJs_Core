import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Subscription,
} from '@nestjs/graphql';

import { User } from '../entities/user.entity';
import { UserInput } from '../input/user.input';
import { UserService } from '../services/user.service';

import BaseResolver from 'src/core/resolver/base.resolver';

import { FindUsersQuery } from '../queries/impl/find-users.query';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { CreateUserEvent } from '../events/impl/create-user.event';

@Resolver()
export class UserResolver extends BaseResolver<User> {
  constructor(private readonly _userService: UserService) {
    super(_userService);
  }

  @Mutation(() => User)
  async createUser(@Args('user') userInput: UserInput): Promise<User> {
    const user = await this._userService.createCommand(
      new CreateUserCommand(userInput),
    );
    this._userService.publish(new CreateUserEvent(user));
    return user;
  }

  @Query(() => [User])
  async getUsers() {
    return await this._userService.findQuery(new FindUsersQuery());
  }
}
