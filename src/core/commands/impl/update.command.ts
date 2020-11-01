import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';

export class UpdateCommand extends BaseCommand {
  constructor(filter: any, public input: BaseInput | object) {
    super();
  }
}
