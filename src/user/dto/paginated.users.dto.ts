import PaginatedData from 'src/core/dto/paginated.entity.dto';
import { User } from '../entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedUsers extends PaginatedData(User) {}
