import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';
import { OR } from '../interfaces/IWhereInput';

export class UpdateCommand<T> extends BaseCommand {
  constructor(public where: OR<T>, public input: BaseInput | any) {
    super();
  }
}
