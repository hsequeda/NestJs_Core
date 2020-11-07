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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
