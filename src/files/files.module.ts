import { Module, Controller } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { File } from './entities/file.entity';
import { FilesService } from './services/files.service';
import { FilesResolver } from './resolver/files.resolver';
import { SchemaConstants } from 'src/common/constants/schema.constants';
import { FilesController } from './controllers/files.controller';
import { UploadService } from './services/upload.service';
import { CqrsModule } from '@nestjs/cqrs';
import { FilesQueryHandlers } from './queries/handlers';
import { FilesCommandHandlers } from './commands/handlers';
import { FilesRepository } from './repositories/files.repository';
import { BaseRepository } from 'src/core/repository/base.repository';


@Module({
	imports: [CqrsModule, TypegooseModule.forFeature([
		{
			typegooseClass: File,
			...SchemaConstants
		}
	]),

	],
	providers: [FilesService, FilesRepository, UploadService, FilesResolver,
		...FilesQueryHandlers,
		...FilesCommandHandlers],
	exports: [FilesService, UploadService],
	controllers: [FilesController]
})
export class FilesModule { }
