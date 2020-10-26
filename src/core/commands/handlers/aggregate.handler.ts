import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { AggregateCommand } from '../impl/aggregate.command';

@CommandHandler(AggregateCommand)
export class CreateHandler<T> implements ICommandHandler<AggregateCommand> {
	constructor(private readonly repository: BaseRepository<T>) { }

	async execute(entry: AggregateCommand): Promise<T> {
		return await this.repository.aggregate(entry.pipe);
	}
}
