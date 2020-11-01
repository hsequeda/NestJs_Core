import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';

export class UpdateOneCommand extends BaseCommand {
  constructor(
    public filter: any,
    public input: BaseInput | object,
    public upsert?: boolean,
  ) {
    super();
  }
}
