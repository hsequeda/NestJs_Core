import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';
import { IWhereUnique } from '../interfaces/IWhereUniqueInput';

export class UpdateOneCommand<T> extends BaseCommand {
  constructor(public where: IWhereUnique<T>, public input: BaseInput | any) {
    super();
  }
}
