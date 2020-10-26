import PaginatedData from 'src/core/dto/paginated.entity.dto';
import { File } from '../entities/file.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedFiles extends PaginatedData(File){}
