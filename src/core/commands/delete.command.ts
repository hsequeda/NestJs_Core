import { BaseCommand } from './base.command';
import { AppBaseEntity } from '../entity/base.entity';
import { OR } from '../interfaces/IWhereInput';

export class DeleteCommand<T extends AppBaseEntity> extends BaseCommand {
  constructor(public where: OR<T>) {
    super();
  }
}
