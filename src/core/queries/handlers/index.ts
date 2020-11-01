import { FindHandler } from './find.handler';
import { FindOneHandler } from './findone.handler';
import { FindPaginatedHandler } from './find-paginated.handler';

export const QueryHandlers = [
  FindHandler,
  FindOneHandler,
  FindPaginatedHandler,
];
