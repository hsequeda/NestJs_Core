import { BaseEvent } from './base.event';
import { AppBaseEntity } from 'src/core/entity/base.entity';

export class UpdateOneEvent extends BaseEvent {
  constructor(public updatedInstance: AppBaseEntity) {
    super();
  }
}
