import { IEntity } from './IEntity';

export type IWhereUnique<T extends IEntity> = {
  [P in keyof T]?: T[P];
};
