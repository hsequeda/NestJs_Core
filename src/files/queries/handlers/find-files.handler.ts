import { QueryHandler } from '@nestjs/cqrs';
import { FindFilesQuery } from '../impl/find-files.query';
import { FindHandler } from 'src/core/queries/handlers/find.handler';
import { File } from '../../entities/file.entity';
import { FilesRepository } from 'src/files/repositories/files.repository';

@QueryHandler(FindFilesQuery)
export class FindFilesHandler extends FindHandler<File>{
  constructor(private readonly filesRepository: FilesRepository) {
    super(filesRepository);
  }
}


