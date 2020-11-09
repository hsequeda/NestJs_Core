import { AggregateRoot } from '@nestjs/cqrs';
import { AppBaseEntity } from '../entity/base.entity';

export type IWhereUnique<T extends AppBaseEntity> = {
  [P in keyof Omit<T, keyof AggregateRoot>]?: T[P];
};
