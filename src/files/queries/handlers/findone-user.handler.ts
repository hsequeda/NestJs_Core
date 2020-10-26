import { QueryHandler } from '@nestjs/cqrs';
import { FindOneFileQuery } from '../impl/findone-file.query';
import { FindOneHandler } from 'src/core/queries/handlers/findone.handler';
import { File } from '../../entities/file.entity';
import { FilesRepository } from 'src/files/repositories/files.repository';

@QueryHandler(FindOneFileQuery)
export class FindOneFileHandler extends FindOneHandler<File>{
  constructor(private readonly filesRepository: FilesRepository) {
    super(filesRepository);
  }
}


