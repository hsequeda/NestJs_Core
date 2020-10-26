import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../../repository/base.repository';
import { DeleteCommand } from '../impl/delete.command';

@CommandHandler(DeleteCommand)
export class DeleteHandler<T> implements ICommandHandler<DeleteCommand> {
	constructor(private readonly repository: BaseRepository<T>) { }

	async execute(entry: DeleteCommand): Promise<any> {
		return await this.repository.delete(entry.filter);
	}
}
