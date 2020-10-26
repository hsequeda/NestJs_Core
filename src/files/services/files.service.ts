import { Injectable } from '@nestjs/common';
import { File, FileType } from '../entities/file.entity';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { FindOneFileQuery } from '../queries/impl/findone-file.query';
import { CreateFileCommand } from '../commands/impl/create-file.command';
import { BaseService } from 'src/core/service/base.service';


@Injectable()
export class FilesService extends BaseService<File> {

	constructor(private readonly cBus: CommandBus,
		private readonly qBus: QueryBus,
		private readonly eBus: EventBus) {
		super(cBus, qBus, eBus);
	}

	async getNoAvatarFile(): Promise<File> {
		const defaultAvatarFile: File = await this.findOneQuery(new FindOneFileQuery({ type: FileType.PICTURE, public_id: 'default.avatar' }));
		if (!defaultAvatarFile) {
			return await this.createCommand(new CreateFileCommand({
				public_id: 'default.avatar',
				type: FileType.PICTURE,
				url: 'https://img2.freepng.es/20180323/pww/kisspng-computer-icons-clip-art-profile-cliparts-free-5ab5a47b02ff75.0880050915218535630123.jpg'
			}));
		}
		return defaultAvatarFile;
	}

	async getFile(fileId?: string): Promise<File> {
		return await this.findOneQuery(new FindOneFileQuery({ _id: fileId }));
	}

}
