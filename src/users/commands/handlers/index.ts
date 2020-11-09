import { CreateUserHandler } from './create.handler';
import { DeleteOneUserHandler } from './delete-one.handler';
import { DeleteUserHandler } from './delete.handler';
import { UpdateOneUserHandler } from './update-one.handler';
import { UpdateUserHandler } from './update.handler';

export const UserCommandHandlers = [
  CreateUserHandler,
  DeleteOneUserHandler,
  DeleteUserHandler,
  UpdateOneUserHandler,
  UpdateUserHandler,
];
