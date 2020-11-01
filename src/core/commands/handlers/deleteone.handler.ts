import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { DeleteOneCommand } from '../impl/delete-one.command';

@CommandHandler(DeleteOneCommand)
export class DeleteOneHandler<T> implements ICommandHandler<DeleteOneCommand> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async execute(entry: DeleteOneCommand): Promise<T> {
    return await this.repository.deleteOne(entry.filter);
  }
}
