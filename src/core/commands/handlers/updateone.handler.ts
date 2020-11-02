import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { UpdateOneCommand } from '../impl/update-one.command';
import { UpdateResult } from 'typeorm';

@CommandHandler(UpdateOneCommand)
export class UpdateOneHandler<T> implements ICommandHandler<UpdateOneCommand> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(entry: UpdateOneCommand): Promise<UpdateResult> {
    return await this._orm.update(entry.filter, entry.input);
  }
}
