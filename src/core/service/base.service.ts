import { InternalServerErrorException } from '@nestjs/common';

import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { ReturnModelType } from '@typegoose/typegoose';
import { MongoError } from 'mongodb';
import { Types, CreateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';
import { BaseRepository } from '../repository/base.repository';

import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { FindOneQuery } from '../queries/impl/findone.query';
import { CreateCommand } from '../commands/impl/create.command';
import { FindQuery } from '../queries/impl/find.query';
import { UpdateCommand } from '../commands/impl/update.command';
import { UpdateOneCommand } from '../commands/impl/update-one.command';
import { CreateEvent } from '../events/impl/create.event';
import { BaseEvent } from '../events/impl/base.event';
import { FindPaginatedQuery } from '../queries/impl/find-paginated.query';
import { DeleteCommand } from '../commands/impl/delete.command';
import { DeleteOneCommand } from '../commands/impl/delete-one.command';

@Injectable()
export class BaseService<T> {

  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus,
              private readonly eventBus: EventBus) {
  }

  getCommandBus(): CommandBus {
    return this.commandBus;
  }

  getQueryBus(): QueryBus {
    return this.queryBus;
  }

  publish(event: BaseEvent) {
    this.eventBus.publish(event);
  }

  async findQuery(findQuery: FindQuery): Promise<T[]> {
    return await this.queryBus.execute(findQuery);
  }

  async findPaginatedQuery(findPaginatedQuery: FindPaginatedQuery): Promise<IPaginatedData<T>> {
    return await this.queryBus.execute(findPaginatedQuery);
  }

  async findOneQuery(findOneQuery: FindOneQuery): Promise<T> {
    return await this.queryBus.execute(findOneQuery);
  }

  async createCommand(createCommand: CreateCommand): Promise<T> {
    return await this.commandBus.execute(createCommand);
  }

  async deleteCommand(deleteCommand: DeleteCommand): Promise<any> {
    return await this.commandBus.execute(deleteCommand);
  }

  async deleteOneCommand(deleteOneCommand: DeleteOneCommand): Promise<T | null> {
    return await this.commandBus.execute(deleteOneCommand);
  }

  async updateOneCommand(updateOneCommand: UpdateOneCommand): Promise<T> {
    return await this.commandBus.execute(updateOneCommand);
  }

  async updateCommand(updateCommand: UpdateCommand): Promise<any> {
    return await this.commandBus.execute(updateCommand);
  }

  async countQuery(filter = {}): Promise<number> {
    return null;
  }


}
