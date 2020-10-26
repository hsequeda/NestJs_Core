import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BaseRepository } from 'src/core/repository/base.repository';
import { File, FileType } from '../entities/file.entity';


@Injectable()
export class FilesRepository extends BaseRepository<File>  {

	constructor(@InjectModel(File) private readonly fileService: ReturnModelType<typeof File>) {
		super(fileService);
	}
}
