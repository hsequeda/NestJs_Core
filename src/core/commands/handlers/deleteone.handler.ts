import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { DeleteOneCommand } from '../impl/delete-one.command';

@CommandHandler(DeleteOneCommand)
export class DeleteOneHandler<T> implements ICommandHandler<DeleteOneCommand> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(entry: DeleteOneCommand): Promise<any> {
    return await this._orm.delete(entry.filter);
  }
}
