import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';

import { GqlAuthGuard } from 'src/common/guards/graphql.auth.guard';
import { PaginatorParams } from 'src/core/dto/paginator.params.dto';

import RequestUtils from 'src/common/utils/request.utils';
import PaginatorUtils from 'src/common/utils/paginator.utils';

import { GqlRolesGuard } from 'src/common/guards/graphql.roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { LoggedInPayload } from '../dto/logged-in-payload.dto';
import { AuthInput } from '../inputs/auth.input';
import { UserInput } from '../../user/input/user.input';
import { ChangePasswordInput } from '../inputs/change-password.input';
import { User } from '../../user/entities/user.entity';

@Resolver('Auth')
export class AuthResolver {

  constructor(private authService: AuthService) {
  }

  @Mutation(() => String, {
    description: 'Recover a password by Email',

  })
  async forgot(@Args('email') email: string) {
    return await this.authService.forgot(email);
  }

  @Mutation(() => LoggedInPayload, {
    description: 'Authenticate a user by email and password',
  })
  async signIn(
    @Args('input', {
      nullable: false,
      description: 'Authenticate a user, using email and password',
    }) input: AuthInput,
  ): Promise<LoggedInPayload> {
    return await this.authService.signIn(input);
  }


	@Mutation(() => LoggedInPayload, {
		description: 'Register a new user and authenticate it',
	})
  async signUp(
    @Args('input', {
      nullable: false,
    }) input: UserInput,
  ): Promise<LoggedInPayload> {
    return await this.authService.signUp(input);
  }

  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles('USER')
  @Mutation(() => Boolean, {
    description: 'Change the password of the authenticated user',
  })

  async changePassword(@Context('req') req: Request,
                       @Args('input', { nullable: false }) input: ChangePasswordInput,
  ): Promise<boolean> {
    const user: User = RequestUtils.extractUserFromRequest(req);
    return Boolean(await this.authService.changePassword(user, input));
  }

}
