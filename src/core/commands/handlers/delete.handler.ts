import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { DeleteCommand } from '../impl/delete.command';
import { DeleteResult } from 'typeorm';

@CommandHandler(DeleteCommand)
export class DeleteHandler<T> implements ICommandHandler<DeleteCommand> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(entry: DeleteCommand): Promise<DeleteResult> {
    return await this._orm.delete(entry.filter);
  }
}
