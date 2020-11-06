import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';

export class UpdateCommand extends BaseCommand {
  constructor(where: any, public input: BaseInput | any) {
    super();
  }
}
