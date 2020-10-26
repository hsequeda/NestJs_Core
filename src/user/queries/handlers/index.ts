import { FindUsersHandler } from './find-users.handler';
import { FindOneUserHandler } from './findone-user.handler';
import { CountUsersHandler } from './count-users.handler';
import { FindPaginatedUsersHandler } from './find-paginated-users.handler';

export const UserQueryHandlers = [FindUsersHandler, FindOneUserHandler, CountUsersHandler, FindPaginatedUsersHandler];
