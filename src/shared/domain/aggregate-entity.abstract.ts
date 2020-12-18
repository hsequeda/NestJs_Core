import { AggregateRoot } from '@nestjs/cqrs';
import { UniqueEntityID } from './UniqueEntityID';
import { IEntity } from '../core/interfaces/IEntity';

export abstract class AggregateDomainEntity<T> extends AggregateRoot
  implements IEntity<T> {
  public readonly _id: UniqueEntityID;
  public readonly props: T;

  protected constructor(props: T, id: UniqueEntityID) {
    super();
    this._id = id;
    this.props = props;
  }

  public equals(entity: AggregateDomainEntity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    if (!this.isEntity(entity)) {
      return false;
    }

    return this._id === entity._id;
  }

  private isEntity(v: any): v is AggregateDomainEntity<any> {
    return v instanceof AggregateDomainEntity;
  }
}
