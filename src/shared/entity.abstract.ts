export abstract class Entity<T> {
  protected readonly _id: string | number;
  public readonly props: T;

  protected constructor(props: T, id?: string | number) {
    this._id = id;
    this.props = props;
  }

  public equals(entity?: Entity<T>): boolean {
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

  private isEntity(v: any): v is Entity<any> {
    return v instanceof Entity;
  }
}
