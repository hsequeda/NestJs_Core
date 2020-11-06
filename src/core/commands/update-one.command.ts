import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';

export class UpdateOneCommand extends BaseCommand {
  constructor(public where: any, public input: BaseInput | any) {
    super();
  }
}
