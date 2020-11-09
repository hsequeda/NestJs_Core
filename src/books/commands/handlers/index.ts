import { CreateBookHandler } from './create.handler';
import { DeleteOneBookHandler } from './delete-one.handler';
import { DeleteBookHandler } from './delete.handler';
import { UpdateOneBookHandler } from './update-one.handler';
import { UpdateBookHandler } from './update.handler';

export const BookCommandHandlers = [
  CreateBookHandler,
  DeleteOneBookHandler,
  DeleteBookHandler,
  UpdateOneBookHandler,
  UpdateBookHandler,
];
