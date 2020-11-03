import { BaseEvent } from './base.event';
import { AppBaseEntity } from 'src/core/entity/base.entity';

export class CreateEvent extends BaseEvent {
  constructor(public newInstance: AppBaseEntity) {
    super();
  }
}
