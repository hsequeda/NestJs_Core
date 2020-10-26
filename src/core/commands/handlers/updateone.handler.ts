import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { UpdateOneCommand } from '../impl/update-one.command';

@CommandHandler(UpdateOneCommand)
export class UpdateOneHandler<T> implements ICommandHandler<UpdateOneCommand> {
	constructor(private readonly repository: BaseRepository<T>) { }

	async execute(entry: UpdateOneCommand): Promise<T> {
		return await this.repository.updateOne(entry.filter, entry.input , entry.upsert);
	}
}
