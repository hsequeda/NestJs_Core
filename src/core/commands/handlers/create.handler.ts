import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseOrm } from '../../orm/base.orm';
import { CreateCommand } from '../impl/create.command';

@CommandHandler(CreateCommand)
export class CreateHandler<T> implements ICommandHandler<CreateCommand> {
  constructor(private readonly _orm: BaseOrm<T>) {}

  async execute(entry: CreateCommand): Promise<T> {
    return await this._orm.save(entry.input);
  }
}
