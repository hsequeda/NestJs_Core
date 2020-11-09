import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';
import { OR } from '../interfaces/IWhereInput';
import { AppBaseEntity } from '../entity/base.entity';

export class UpdateCommand<T extends AppBaseEntity> extends BaseCommand {
  constructor(public where: OR<T>, public input: BaseInput | any) {
    super();
  }
}
