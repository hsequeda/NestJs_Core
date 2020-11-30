import { UniqueEntityID } from './UniqueEntityID';

export abstract class DomainEntity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(entity: DomainEntity<T>): boolean {
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

  private isEntity(v: any): v is DomainEntity<any> {
    return v instanceof DomainEntity;
  }
}
