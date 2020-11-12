import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBookQuery } from '../impl/find.query';
import { BooksRepository } from 'src/books/repositories/books.repository';
import { PayloadBook } from 'src/books/dto/payload-book.dto';

@QueryHandler(FindBookQuery)
export class FindBookHandler implements IQueryHandler<FindBookQuery> {
  constructor(private readonly _bookRepository: BooksRepository) {}
  async execute(query: FindBookQuery): Promise<PayloadBook> {
    return this._bookRepository.find(query.where);
  }
}
