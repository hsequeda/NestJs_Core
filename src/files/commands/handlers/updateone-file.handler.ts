import { CommandHandler } from '@nestjs/cqrs';
import { File } from 'src/files/entities/file.entity';
import { UpdateOneHandler } from 'src/core/commands/handlers/updateone.handler';
import { FilesRepository } from 'src/files/repositories/files.repository';
import { UpdateOneFileCommand } from '../impl/updateone-file.command';

@CommandHandler(UpdateOneFileCommand)
export class UpdateOneFileHandler extends UpdateOneHandler<File>{
  constructor(private readonly fileRepository: FilesRepository) {
    super(fileRepository)
  }
}
