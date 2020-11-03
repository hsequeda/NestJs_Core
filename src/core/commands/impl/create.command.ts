import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';
import { AppBaseEntity } from 'src/core/entity/base.entity';

export class CreateCommand extends BaseCommand {
  constructor(public input: BaseInput | AppBaseEntity) {
    super();
  }
}
