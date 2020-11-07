import { BaseCommand } from './base.command';
import { BaseInput } from '../input/base.input';

export class CreateCommand extends BaseCommand {
  constructor(public data: BaseInput) {
    super();
  }
}
