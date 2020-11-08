import { BaseCommand } from './base.command';
import { IWhereUnique } from '../interfaces/IWhereUniqueInput';

export class DeleteOneCommand<T> extends BaseCommand {
  constructor(public where?: IWhereUnique<T>) {
    super();
  }
}
