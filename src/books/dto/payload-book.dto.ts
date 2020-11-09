import PayloadData from 'src/shared/dto/base-payload.dto';
import { Book } from '../entities/book.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PayloadBook extends PayloadData(Book) {}
