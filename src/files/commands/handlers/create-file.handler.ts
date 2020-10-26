import { CommandHandler, EventPublisher, } from '@nestjs/cqrs';
import { CreateHandler } from 'src/core/commands/handlers/create.handler';
import { File } from 'src/files/entities/file.entity';
import { CreateFileCommand } from '../impl/create-file.command';
import { FilesRepository } from 'src/files/repositories/files.repository';

@CommandHandler(CreateFileCommand)
export class CreateFileHandler extends CreateHandler<File>{
  constructor(private readonly fileRepository: FilesRepository) {
    super(fileRepository)
  }

}
