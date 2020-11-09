import { BaseCommand } from './base.command';
import { IWhereUnique } from '../interfaces/IWhereUniqueInput';
import { AppBaseEntity } from '../entity/base.entity';

export class DeleteOneCommand<T extends AppBaseEntity> extends BaseCommand {
  constructor(public where?: IWhereUnique<T>) {
    super();
  }
}
