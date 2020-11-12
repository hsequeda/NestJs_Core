import { BaseInput } from 'src/core/input/base.input';
import { BaseCommand } from './base.command';
import { IWhereUnique } from '../interfaces/IWhereUniqueInput';
import { AppBaseEntity } from '../entity/base.entity';

export class UpdateOneCommand<T extends AppBaseEntity> extends BaseCommand {
  constructor(public where: IWhereUnique<T>, public input: BaseInput | any) {
    super();
  }
}
