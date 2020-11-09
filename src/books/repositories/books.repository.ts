import { BaseOrm } from 'src/core/orm/base.orm';
import { Book } from '../entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksRepository extends BaseOrm<Book> {
  constructor(@InjectRepository(Book) _bookRepository: Repository<Book>) {
    super(_bookRepository);
  }
}
