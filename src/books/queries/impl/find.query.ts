import { WhereBookInput } from 'src/books/dto/where-book.input';
import { FindQuery } from 'src/core/queries/find.query';

export class FindBookQuery extends FindQuery {
  constructor(public where: WhereBookInput[]) {
    super();
  }
}
