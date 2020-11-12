import { BaseCommand } from './base.command';
import { BaseInput } from '../input/base.input';

export class CreateCommand<T extends BaseInput> extends BaseCommand {
  constructor(public data: T) {
    super();
  }
}
