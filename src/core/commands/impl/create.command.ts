import { BaseInput } from 'src/core/input/base.input';
import { BaseEntity } from 'src/core/entity/base.entity';
import { BaseCommand } from './base.command';

export class CreateCommand extends BaseCommand {
  constructor(public input: BaseInput | BaseEntity) {
    super();
  }
}
