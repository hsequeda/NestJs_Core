import { CreatedCompanyHandler } from './created-company.handler';
import { DeletedCompanyHandler } from './deleted-company.handler';
import { UpdatedCompanyHandler } from './updated-company.handler';

export const EventHandlers = [
  CreatedCompanyHandler,
  DeletedCompanyHandler,
  UpdatedCompanyHandler,
];
