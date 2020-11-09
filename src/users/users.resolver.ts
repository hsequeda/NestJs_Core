import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { WhereUserInput } from './dto/where-user.input';
import { PayloadUser } from './dto/payload-user.dto';
import { WhereUniqueUserInput } from './dto/where-unique-user.input';
import { UpdateOneUserInput } from './dto/updateone-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => PayloadUser, { name: 'users' })
  async findAll(
    @Args('where', { type: () => [WhereUserInput] }) where: WhereUserInput[],
  ) {
    const x = await this.usersService.findAll(where);
    console.log(x);
    return x;
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('where', { type: () => WhereUniqueUserInput })
    where: WhereUniqueUserInput,
  ) {
    return this.usersService.findOne(where);
  }

  @Mutation(() => [User], { nullable: 'itemsAndList' })
  updateUser(
    @Args('where', { type: () => [WhereUserInput] })
    where: WhereUserInput[],
    @Args('data') data: UpdateUserInput,
  ) {
    return this.usersService.update(where, data);
  }

  @Mutation(() => User, { nullable: true })
  updateOneUser(
    @Args('where', { type: () => WhereUniqueUserInput })
    where: WhereUniqueUserInput,
    @Args('data') data: UpdateOneUserInput,
  ) {
    return this.usersService.updateOne(where, data);
  }

  @Mutation(() => User, { nullable: true })
  removeOneUser(
    @Args('where', { type: () => WhereUniqueUserInput })
    where: WhereUniqueUserInput,
  ) {
    return this.usersService.removeOne(where);
  }

  @Mutation(() => [User], { nullable: 'itemsAndList' })
  removeUser(
    @Args('where', { type: () => [WhereUserInput] }) where: WhereUserInput[],
  ) {
    return this.usersService.remove(where);
  }
}
