import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { User } from '../entities/user.entity';
import { UserInput } from '../input/user.input';
import { UserService } from '../services/user.service';
import { PaginatedUsers } from '../dto/paginated.users.dto';

import { GqlAuthGuard } from 'src/common/guards/graphql.auth.guard';
import { PaginatorParams } from 'src/core/dto/paginator.params.dto';

import RequestUtils from 'src/common/utils/request.utils';
import PaginatorUtils from 'src/common/utils/paginator.utils';

import { GqlRolesGuard } from 'src/common/guards/graphql.roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';

import { UserActions } from '../actions/user.actions';
import BaseResolver from 'src/core/resolver/base.resolver';
import { GraphQLJSON } from 'graphql-scalars';
import { FindPaginatedUsersQuery } from '../queries/impl/find-paginated-users.query';
import { FindOneUserQuery } from '../queries/impl/findone-user.query';
import { UserUpdateInput } from '../input/user-update.input';
import { UpdateOneUserCommand } from '../commands/impl/updateone-user.command';


@Resolver()
export class UserResolver extends BaseResolver<User> {

  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async profile(@Context('req') req: Request) {
    const user: User = RequestUtils.extractUserFromRequest(req);
    return user;
  }


  @Mutation(() => User)
  async createUser(@Args('user') userInpt: UserInput): Promise<User> {
    const user: User = await this.userService.register(userInpt);
    this.pubsub.publish(UserActions.USER_ADD, user);
    return user;
  }


  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles('ADMIN')
  @Query(() => PaginatedUsers)
  async getUsers(
    @Args({ name: 'filter', type: () => GraphQLJSON, nullable: true }) filter: JSON,
    @Args('paginator') paginator: PaginatorParams): Promise<PaginatedUsers> {
    paginator = PaginatorUtils.processQueryParams(paginator);

    return await this.userService.findPaginatedQuery(new FindPaginatedUsersQuery(filter, paginator));
  }

  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles('USER')
  @Query(() => User)
  async me(@Context('req') req: Request) {
    const user: User = RequestUtils.extractUserFromRequest(req);
    return await this.userService.findOneQuery(new FindOneUserQuery({ _id: user._id }));
  }


  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles('USER')
  @Mutation(() => User)
  async updateMe(@Context('req') req: Request,
                 @Args('input') input: UserUpdateInput) {
    const user: User = RequestUtils.extractUserFromRequest(req);
    return await this.userService.updateOneCommand(new UpdateOneUserCommand({ _id: user._id }, input));
  }


}
