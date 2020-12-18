import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';

export interface IEntity<T> {
  readonly _id: UniqueEntityID;
  readonly props: T;
  equals(entity: IEntity<T>): boolean;
}
