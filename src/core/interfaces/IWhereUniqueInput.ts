import { AggregateRoot } from '@nestjs/cqrs';

export type IWhereUnique<T> = {
  [P in keyof Omit<T, keyof AggregateRoot>]?: T[P];
};
