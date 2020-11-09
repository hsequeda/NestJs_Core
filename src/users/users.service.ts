import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { BaseService } from 'src/core/service/base.service';
import { User } from './entities/user.entity';
import { QueryBus, CommandBus, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create.command';
import { WhereUserInput } from './dto/where-user.input';
import { FindUserQuery } from './queries/impl/find.query';
import { PayloadUser } from './dto/payload-user.dto';
import { WhereUniqueUserInput } from './dto/where-unique-user.input';
import { DeleteOneUserCommand } from './commands/impl/delete-one.command';
import { DeleteUserCommand } from './commands/impl/delete.command';
import { UpdateOneUserCommand } from './commands/impl/update-one.command';
import { UpdateOneUserInput } from './dto/updateone-user.input';
import { UpdateUserCommand } from './commands/impl/update.command';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(qBus: QueryBus, cBus: CommandBus, eBus: EventBus) {
    super(cBus, qBus, eBus);
  }
  create(createUserInput: CreateUserInput) {
    return this.createCommand(new CreateUserCommand(createUserInput));
  }

  async findAll(where: WhereUserInput[]): Promise<PayloadUser> {
    return this.findQuery(new FindUserQuery(where));
  }

  findOne(where: WhereUniqueUserInput) {
    return `This action returns a #${where} user`;
  }

  updateOne(where: WhereUniqueUserInput, data: UpdateOneUserInput) {
    return this.updateOneCommand(new UpdateOneUserCommand(where, data));
  }

  update(where: WhereUserInput[], data: UpdateUserInput) {
    return this.updateCommand(new UpdateUserCommand(where, data));
  }

  removeOne(where: WhereUniqueUserInput) {
    return this.deleteOneCommand(new DeleteOneUserCommand(where));
  }

  remove(where: WhereUserInput[]) {
    return this.deleteCommand(new DeleteUserCommand(where));
  }
}
