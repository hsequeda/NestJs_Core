import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { CreateCommand } from '../impl/create.command';

@CommandHandler(CreateCommand)
export class CreateHandler<T> implements ICommandHandler<CreateCommand> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async execute(entry: CreateCommand): Promise<T> {
    return await this.repository.create(entry.input);
  }
}
